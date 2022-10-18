import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
    Section,
    SectionTop,
} from '../../shared/components/welcome-css';
import { Steps, notification, Spin } from 'antd';
import Questions from '../../shared/components/steps/Questions';
import styled from 'styled-components';
import { useTimer } from 'react-timer-hook';
import LayoutBlanc from '../../shared/layouts/LayoutBlanc';
import { ModalExpiredTimer } from '../../shared/components/modal/QuizModalActions';
import Timer from '../../shared/components/steps/Timer';
import { enregistrer_score, envoi_de_la_reponse, liste_questions } from '../api/pack/pack-actions';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { ENVOI_DE_LA_REPONSE_URL } from '../api/config/ApiRouter';
import { useDispatch } from 'react-redux';
import { setScoreData } from '../../features/score.slice';


const Fade = require("react-reveal/Fade")
const { Step } = Steps;

const QSteps = styled(Steps)`
    .ant-steps-item {
        display : none;
    }
`;

interface IQuestionResponse {
    question_id: number;
    answer_id: number | string;
    subscription_id?: number | string;
}


export default function () {
    const router = useRouter();
    const pid = router.query.index as unknown as string;
    const souscription_id = pid && pid.split('|')[0];
    const [current, setCurrent] = useState(0);
    const [expiredModal, setExpiredModal] = useState(false);
    const [questions, setQuestions] = useState<any>([]);
    const [chargement, setChargement] = useState(false);
    const expiryTimestamp = new Date();
    const [responseData, setResponseData] = useState<IQuestionResponse[]>([]);
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 20);

    const {
        seconds,
        minutes,
        restart,
        pause
    } = useTimer({ expiryTimestamp, onExpire: () => handleExpirerTimer() });
    const nombreDePoints = useSelector((state: any) => state.score.points);
    const dispatch = useDispatch();
    const [totalQuestion, setTotalQuestion] = useState(0);
    const [totalrepondu, settotalrepondu] = useState(0);

    React.useEffect(() => {
        handlegetListeQuestions();
    }, []);



    const handlegetListeQuestions = () => {
        setChargement(true)
        liste_questions(souscription_id).then((res) => {
            setChargement(false)
            if (res.status === 'succes') {
                if (res.data.questions.length === 0) {
                    router.back();
                }
                else {
                    setQuestions(res.data.questions);
                    setTotalQuestion(res.data.nb_question);
                    settotalrepondu(res.data.nb_answer_gave)

                    // calcul du nombre de points au demarrage de la page
                    dispatch(setScoreData({ points: res.data.nb_points }))
                }

            }
            else {
                setQuestions([]);
            }
        })
    }

    const next = () => {
        setExpiredModal(false);

        const time = new Date();
        time.setSeconds(time.getSeconds() + 20);
        restart(time)
        setCurrent(current + 1);
    };

    const prev = () => {
        restart(expiryTimestamp)
        setCurrent(current - 1);
    };

    const done = () => {
        let data = {
            score: nombreDePoints
        }
        router.push(`/score/${v4()}`)

        // enregistrer_score(data).then((res) => {
        //     if (res.status === 'succes') {
        //         router.push(`score/${v4()}`)
        //     }
        //     else {
        //         notification.error({
        //             message: res.status,
        //             description: res.message,
        //             placement: 'bottomRight'
        //         })
        //     }
        // })
    };

    const handleExpirerTimer = () => {
        if (expiredModal === false) {
            setExpiredModal(true)
        }
        else {
            setExpiredModal(false)
        }
    }

    const StepContentComponent = () => {
        return (
            <Spin spinning={chargement}>
                <Fade top>
                    <Questions
                        seconds={seconds}
                        minutes={minutes}
                        title={'title'}
                        next={next}
                        prev={prev}
                        totalQuestion={totalQuestion}
                        steps={questions && questions.length}
                        current={current}
                        done={done}
                        questions={questions && questions[current]}
                        reponse={handleChoisirReponse}
                        numeroQuestion={totalrepondu + current + 1}
                        key={current}
                    />
                </Fade>
            </Spin>
        )
    }

    const handleChoisirReponse = (reponseId: number) => {
        let newElement: IQuestionResponse = {
            question_id: questions && questions[current].id,
            answer_id: reponseId,
            subscription_id: souscription_id
        }
        // oldreponse.push(newElement)
        pause();
        // envoi de la reponse au backend 
        envoi_de_la_reponse(newElement).then((res: any) => {
            if (res.status === 'succes') {
                dispatch(setScoreData({ points: res.data.nb_points }))
                return true;
            }
            else {
                notification.error({
                    message: res.status,
                    description: res.message,
                    placement: 'bottomRight'
                })
            }
        });
    }

    const handleTimeExpire = () => {
        let newElement: IQuestionResponse = {
            question_id: questions && questions[current].id,
            answer_id: -1,
            subscription_id: souscription_id
        }

        // envoi de la reponse au backend 
        envoi_de_la_reponse(newElement).then((res: any) => {
            if (res.status === 'succes') {
                dispatch(setScoreData({ points: res.data.nb_points }))
                return true;
            }
            else {
                notification.error({
                    message: res.status,
                    description: res.message,
                    placement: 'bottomRight'
                })
            }
        });

        if (questions) {
            if (current === (questions.length - 1))
                done();
            else
                next();
        }
    }

    return (
        <LayoutBlanc>
            <Section>
                <Timer />
                <SectionTop color='FFF'>
                    <>
                        <QSteps current={current} >
                            {questions && questions.map((item: any) => (
                                <Step key={item.libelle} title={item.libelle} />
                            ))}
                        </QSteps>
                        <div className="steps-content">
                            {StepContentComponent()}
                        </div>
                    </>
                </SectionTop>

                {expiredModal &&
                    <ModalExpiredTimer
                        visible={expiredModal}
                        close={() => { }}
                        handleOk={handleTimeExpire}
                        current={[current, questions && questions.length]}
                        loading={false}
                    />
                }
            </Section>
        </LayoutBlanc>

    )
}
