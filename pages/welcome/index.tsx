import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import AppLayout from '../../shared/layouts/AppLayout';
import { Col, Container, Navbar, Row } from 'react-bootstrap';

import {
    Section,
    SectionTop,
    Logo,
    UserInfoContent,
    SectionTopContent,
    Circle,
    ContentCircle,
    ContentTxt,
    IntoTitle,
    IntoSubTitle,
    SectionMain
} from './components/css';
import { Avatar, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { QBdefault } from '../../shared/components/header/css/Buttons';
import Card from './components/card/Card';
import LotaGagner from './components/card/LotaGagner';


const { Title } = Typography

const Accueil: NextPage = () => {


    return (
        <AppLayout title='Quiz' description='Quiz'>
            <Section>
                <SectionTop>
                    <Navbar>
                        <Container>
                            <Navbar.Brand href="#home">
                                <Logo />
                            </Navbar.Brand>
                            <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-end">
                                <Space>
                                    <UserInfoContent>
                                        <small>Bonjour.</small>
                                        <span>07 77 95 23 56</span>
                                    </UserInfoContent>
                                    <div>
                                        <Avatar size="large" icon={<UserOutlined />} />
                                    </div>
                                </Space>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <SectionTopContent>
                        <Row>
                            <Col md={8} xs={4}>
                                <ContentTxt>
                                    <section>
                                        <IntoTitle>
                                            Bienvenue sur <br /> Quiz Cote d'Ivoire
                                        </IntoTitle>
                                        <IntoSubTitle>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        </IntoSubTitle>
                                        <QBdefault>
                                            lire le règlement
                                        </QBdefault>
                                    </section>
                                </ContentTxt>
                            </Col>
                            <Col md={4} xs={4}>
                                <ContentCircle>
                                    <Circle dimension='300px' />
                                </ContentCircle>
                            </Col>
                        </Row>
                    </SectionTopContent>
                </SectionTop>

                <SectionMain>
                    <Row>
                        <Col md={4}>
                            <Card />
                        </Col>

                        <Col md={4}>
                            <Card />
                        </Col>

                        <Col md={4}>
                            <Card />
                        </Col>
                    </Row>

                    <div className='d-flex justify-content-center pt-4 flex-column'>
                        <Title level={2} className='text-center'>Joue et gagne de nombreux lots !</Title>
                        <span className='text-center'>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium  <br />
                            doloremque laudantium, totam rem aperiam.
                        </span>
                    </div>

                    <LotaGagner />
                </SectionMain>
            </Section>
        </AppLayout>

    )
}

export default Accueil;
