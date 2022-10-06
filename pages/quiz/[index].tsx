import { useRouter } from 'next/router';
import React from 'react';
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
} from '../welcome/components/css';
import {
    Formik,
    Form,
    Field,
} from 'formik';
import * as Yup from 'yup';
import { FormError, InputItemField, InputItemNumberField } from '../../shared/components/formComponent';
import { QBActive, QBdefaultPadding } from '../../shared/components/header/css/Buttons';
import { Space, Typography } from 'antd';
import Theme from '../welcome/components/card/Theme';
import Question from './components/Question';
import { ArrowRightOutlined } from '@ant-design/icons';

interface Idigit {
    digit_1: string;
    digit_2: string;
    digit_3: string;
    digit_4: string;
}

const {Title} = Typography

const ListTheme = [
    'Culture générale',
    'Sport',
    'Politique',
    'Musique',
    'Arts',
    'Culture générale'
]

export default function () {
    const router = useRouter();

    const handleOk = () => { }



    return (
        <AppLayout title='Quiz' description='Quiz'>
            <Navbar style={{ boxShadow: 'rgba(0, 0, 0, 0.01) 0px 10px 27px' }}>
                <Header />
            </Navbar>

            <Section>
                <SectionTop color='FFF'>
                    <SectionTopContent >
                        <div className='d-flex justify-content-between'>
                            <Title level={4}>
                                Question 1
                            </Title>
                        </div>
                        <Row className='pt-4' style={{ borderTop: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }}>
                            <Col md={4} xs={4}>
                                <ContentTxt style={{ alignItems: 'flex-start' }}>
                                    <section>
                                        <IntoSubTitle>
                                            Sed ut perspiciatis unde omnis iste natus error
                                            sit voluptatem accusantium doloremque laudantium, totam rem
                                            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                                            beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                        </IntoSubTitle>

                                    </section>
                                </ContentTxt>
                            </Col>
                            <Col md={8} xs={4}>
                                <Row>
                                    {ListTheme.map((item) => (
                                        <Col md={6}>
                                            <Question />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                        <div className='mt-2'>
                            <Space>
                                <QBActive
                                    onClick={handleOk}
                                >
                                    VALIDER RÉPONSE
                                </QBActive>

                                <QBdefaultPadding
                                    onClick={close}
                                >
                                    <Space>
                                        <span>PASSER</span>
                                        <ArrowRightOutlined />
                                    </Space>
                                </QBdefaultPadding>
                            </Space>
                        </div>
                    </SectionTopContent>
                </SectionTop>
            </Section>
        </AppLayout>

    )
}
