import React from 'react';
import { Navbar } from 'react-bootstrap';
import Header from '../components/header/Header';
import AppLayout from './AppLayout';
import LogoQuiz from '../../public/assets/Header-logo-blue.png';
import styled from 'styled-components';
import FooterBottom from '../components/footer/FooterBottom';

const Fade = require('react-reveal/Fade')


const Bottom = styled.div`
    position: fixed;
    width: 100%;
    bottom: 0
`;

const LayoutBlanc = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppLayout title='Quiz' description='Quiz'>
            <Navbar style={{ boxShadow: 'rgba(0, 0, 0, 0.01) 0px 10px 27px' }}>
                <Header logo={LogoQuiz} />
            </Navbar>

            <section style={{ marginTop: '1rem' }}>
                <Fade top>
                    {children}
                </Fade>
            </section>

            <Bottom>
                <FooterBottom />
            </Bottom>
        </AppLayout>

    )
}

export default LayoutBlanc;
