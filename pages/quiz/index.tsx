import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Row, Col, Navbar } from 'react-bootstrap';
import Header from '../../shared/components/header/Header';
import AppLayout from '../../shared/layouts/AppLayout';
import {
    Section,
    SectionTop,
    Logo,
    UserInfoContent,
    SectionTopContent,
    Circle,
    ContentTxt,
    IntoTitle,
    IntoSubTitle,
    FormNumeroContent
} from '../../shared/components/welcome-css';
import {
    Formik,
    Form,
    Field,
} from 'formik';
import * as Yup from 'yup';
import { FormError, InputItemField, InputItemNumberField } from '../../shared/components/formComponent';
import { QBActive, QBdefaultPadding } from '../../shared/components/header/css/Buttons';
import { Space, Typography, Button, message, Steps } from 'antd';
import Theme from '../welcome/components/card/Theme';
import Question from './components/Question';
import { ArrowRightOutlined } from '@ant-design/icons';
import Questions from '../../shared/components/steps/Questions';
import styled from 'styled-components';
import FooterBottom from '../../shared/components/footer/FooterBottom';
import { useTimer } from 'react-timer-hook';
import LogoQuiz from '../../public/assets/Header-logo-blue.png';
import LayoutBlanc from '../../shared/layouts/LayoutBlanc';





const Fade = require("react-reveal/Fade")




interface Idigit {
    digit_1: string;
    digit_2: string;
    digit_3: string;
    digit_4: string;
}

const { Title } = Typography

const ListTheme = [
    'Culture générale',
    'Sport',
    'Politique',
    'Musique',
    'Arts',
    'Culture générale'
];

const { Step } = Steps;

const steps = [
    {
        title: 'Question 1',
    },
    {
        title: 'Question 2',
    },
    {
        title: 'Question 3',
    },
];

const QSteps = styled(Steps)`
    .ant-steps-item {
        display : none;
    }
`;

const Bottom = styled.div`
    position: fixed;
    width: 100%;
    bottom: 0
`;

export default function () {
    const router = useRouter();
    const [current, setCurrent] = useState(0);
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 120);

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


    const next = () => {
        restart(expiryTimestamp)
        setCurrent(current + 1);
    };

    const prev = () => {
        restart(expiryTimestamp)
        setCurrent(current - 1);
    };

    const done = () => {

    };


    const handleOk = () => { }

    const StepContentComponent = (title: string) => {
        return (
            <Fade top>
                <Questions seconds={seconds} minutes={minutes} title={title} next={next} prev={prev} steps={steps.length} current={current} done={done} />
            </Fade>
        )
    }


    return (
        <LayoutBlanc>
            <Section>
                <SectionTop color='FFF'>
                    <>
                        <QSteps current={current} >
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </QSteps>
                        <div className="steps-content">
                            {StepContentComponent(steps[current].title)}
                        </div>
                    </>

                </SectionTop>
            </Section>
        </LayoutBlanc>

    )
}
