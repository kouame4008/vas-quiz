import React from 'react';
import { Navbar } from 'react-bootstrap';
import Header from '../components/header/Header';
import LogoQuiz from '../../public/assets/Header-logo-blue.png';
import styled from 'styled-components';
import FooterBottom from '../components/footer/FooterBottom';
import AppNoFooter from './AppNoFooter';

const Fade = require('react-reveal/Fade')


const Bottom = styled.div`
    position: fixed;
    width: 100%;
    bottom: 0
`;

const LayoutBlanc = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppNoFooter title='Quiz' description='Quiz'>
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
        </AppNoFooter>

    )
}

export default LayoutBlanc;
