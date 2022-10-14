import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
    Section,
    SectionTop,
} from '../../shared/components/welcome-css';
import { Steps, notification } from 'antd';
import Questions from '../../shared/components/steps/Questions';
import styled from 'styled-components';
import { useTimer } from 'react-timer-hook';
import LayoutBlanc from '../../shared/layouts/LayoutBlanc';
import { ModalExpiredTimer } from '../../shared/components/modal/QuizModalActions';
import Timer from '../../shared/components/steps/Timer';
import { enregistrer_score, liste_questions } from '../api/pack/pack-actions';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';


const Fade = require("react-reveal/Fade")
const { Step } = Steps;

const QSteps = styled(Steps)`
    .ant-steps-item {
        display : none;
    }
`;

export default function () {
    const router = useRouter();
    const pid = router.query.index as unknown as string;
    const souscription_id = pid && pid.split('|')[0];
    const [current, setCurrent] = useState(0);
    const [expiredModal, setExpiredModal] = useState(false);
    const [questions, setQuestions] = useState([]);
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60);

    const {
        seconds,
        minutes,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => handleExpirerTimer() });
    const nombreDePoints = useSelector((state: any) => state.score.points);

    React.useEffect(() => {
        handlegetListeQuestions();
    }, []);



    const handlegetListeQuestions = () => {
        liste_questions(souscription_id).then((res) => {
            if (res.status === 'succes') {
                setQuestions(res.questions);
            }
            else {
                setQuestions([]);
            }
        })
    }

    const next = () => {
        setExpiredModal(false)
        restart(expiryTimestamp)
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
            <Fade top>
                <Questions
                    seconds={seconds}
                    minutes={minutes}
                    title={'title'}
                    next={next}
                    prev={prev}
                    steps={questions && questions.length}
                    current={current}
                    done={done}
                    questions={questions && questions[current]}
                    key={current}
                />
            </Fade>
        )
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
                        close={handleExpirerTimer}
                        handleOk={next}
                        loading={false}
                    />
                }
            </Section>
        </LayoutBlanc>

    )
}
