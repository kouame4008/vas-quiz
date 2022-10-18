import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
    IntoTitle,
    Section,
    SectionTop,
} from '../../shared/components/welcome-css';
import { Steps, notification, Spin, PageHeader } from 'antd';
import Questions from '../../shared/components/steps/Questions';
import styled from 'styled-components';
import { useTimer } from 'react-timer-hook';
import LayoutBlanc from '../../shared/layouts/LayoutBlanc';
import { ModalExpiredTimer } from '../../shared/components/modal/QuizModalActions';
import Timer from '../../shared/components/steps/Timer';
import { envoi_de_la_reponse, liste_questions } from '../api/pack/pack-actions';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { setScoreData } from '../../features/score.slice';
import congratulation from '../../public/assets/congratulation.gif';
import { QBActive } from '../../shared/components/header/css/Buttons';


const Fade = require("react-reveal/Fade")
const { Step } = Steps;

const QSteps = styled(Steps)`
    .ant-steps-item {
        display : none;
    }
`;

const Congratulation = styled.div`
    position: absolute;
    background: ${(props: { type: boolean }) => props.type && `url(${congratulation.src})`};
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.3;
    z-index: 0;
    background-size : cover;
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
    const [congratulationVisible, setCongratulationVisible] = useState(false);
    const msg = new SpeechSynthesisUtterance()

    React.useEffect(() => {
        handlegetListeQuestions();
    }, []);

    const speechHandler = (text: string) => {
        msg.text = text
        window && window.speechSynthesis.speak(msg)
    }


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
        if (congratulationVisible === true) {
            setCongratulationVisible(false)
        }

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

    const handleChoisirReponse = (reponse: any) => {
        if (reponse.correct === 1) {
            setCongratulationVisible(true);
            speechHandler('Félicitation, vous pouvez passer à la question suivante');
        }
        else {
            speechHandler('Mauvaise reponse !');
        }

        let newElement: IQuestionResponse = {
            question_id: questions && questions[current].id,
            answer_id: reponse.id,
            subscription_id: souscription_id
        }
        // oldreponse.push(newElement)
        pause();
        // envoi de la reponse au backend 
        envoi_de_la_reponse(newElement).then((res: any) => {
            if (res.status === 'succes') {
                dispatch(setScoreData({ points: res.data.nb_points }))
                if (questions) {
                    if (current === (questions.length - 1))
                        speechHandler('Félicitation, vous avez repondu a toutes les question. Cliquez sur le bouton terminer pour voir votre score.');
                }
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
                dispatch(setScoreData({ points: res.data.nb_points }));

                if (questions) {
                    if (current === (questions.length - 1))
                        speechHandler('Félicitation, vous avez repondu a toutes les question. Cliquez sur le bouton terminer pour voir votre score.');
                }
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

    const handleGotoHomePage = () => {
        router.push(`/welcome/${v4()}`)
    }

    return (
        <LayoutBlanc>
            <Section>
                <div style={{ zIndex: 1, position: 'relative' }}>
                    <SectionTop color='FFF'>
                        <PageHeader
                            title={<IntoTitle style={{ fontSize: '26px', color: '#004E9C', textAlign: 'center' }}>
                                Liste des Questions
                            </IntoTitle>}
                            onBack={() => handleGotoHomePage()}
                            extra={[
                                <QBActive onClick={() => handleGotoHomePage()}>
                                    Retour a l'accueil
                                </QBActive>
                            ]}
                        />
                        <Timer />

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
                </div>
                {congratulationVisible && <Congratulation type={congratulationVisible} />}
            </Section>
        </LayoutBlanc>

    )
}
