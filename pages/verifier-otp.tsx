import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Row, Col, Navbar } from 'react-bootstrap';
import Header from '../shared/components/header/Header';
import AppLayout from '../shared/layouts/AppLayout';
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
} from '../shared/components/welcome-css';
import {
    Formik,
    Form,
    Field,
} from 'formik';
import * as Yup from 'yup';
import { FormError, InputItemField, InputItemNumberField } from '../shared/components/formComponent';
import { QBActive, QBdefaultPadding } from '../shared/components/header/css/Buttons';
import { Space } from 'antd';
import LogoQuiz from '../public/assets/Header-logo-blue.png';
import LayoutBlanc from '../shared/layouts/LayoutBlanc';


const phoneRegExp = /(07)[1-9]*(\d)/;

interface Idigit {
    digit_1: string;
    digit_2: string;
    digit_3: string;
    digit_4: string;
}

export default function () {
    const router = useRouter();
    const [loading, setLoading] = useState(false)


    const handleSubmitForm = (values: Idigit) => {
        setLoading(true)
        router.push('/choisir-theme')
    }

    const validationSchema = Yup.object().shape({
        numero: Yup.string()
            .required('Le champ numero de telephone est requis')
            .min(10, 'Le numero de telephone est de 10 caractères')
            .max(10, 'Le numero de telephone est de 10 caractères')
            .matches(phoneRegExp, 'Le numero de telephone doit commencer par (07)')
    });

    const controlText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            return true;
        }
        return false
    };

    return (
        <LayoutBlanc>
            <Section>
                <SectionTop color='FFF'>
                    <SectionTopContent>
                        <Row>
                            <Col md={4} xs={4}>
                                <ContentTxt>
                                    <section>
                                        <IntoTitle style={{ fontSize: '56px', color: '#000' }}>
                                            Encore une <br />  Étape ! <br />
                                        </IntoTitle>
                                        <IntoSubTitle style={{ color: '#000' }}>
                                            Sed ut perspiciatis unde omnis iste natus error
                                            sit voluptatem accusantium doloremque laudantium, totam rem
                                            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                                            beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                        </IntoSubTitle>

                                    </section>
                                </ContentTxt>
                            </Col>
                            <Col md={8} xs={4}>
                                <div className='d-flex align-items-end w-100 h-100 justify-content-end'>
                                    <FormNumeroContent>
                                        <Formik
                                            initialValues={{
                                                digit_1: '',
                                                digit_2: '',
                                                digit_3: '',
                                                digit_4: '',
                                            }}
                                            onSubmit={(values: Idigit) => handleSubmitForm(values)}
                                        // validationSchema={validationSchema}
                                        >
                                            {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                                                <Form>
                                                    <div className="current-steep-content">
                                                        <Row>
                                                            <Col md={7} style={{ paddingLeft: '0' }}>
                                                                <label style={{ width: '100%' }} htmlFor="firstName">Saisis le code reçu par SMS pour valider ton inscription.. <sup>*</sup></label>
                                                                <Space>
                                                                    <InputItemField
                                                                        style={{ width: '50px', textAlign: 'center' }}
                                                                        value={values.digit_1}
                                                                        onChange={(e) => {
                                                                            controlText(e) === true && setFieldValue('digit_1', e.target.value)
                                                                        }}
                                                                    />

                                                                    <InputItemField
                                                                        style={{ width: '50px', textAlign: 'center' }}
                                                                        value={values.digit_2}
                                                                        onChange={(e) => {
                                                                            controlText(e) === true && setFieldValue('digit_2', e.target.value)
                                                                        }}
                                                                    />

                                                                    <InputItemField
                                                                        style={{ width: '50px', textAlign: 'center' }}
                                                                        value={values.digit_3}
                                                                        onChange={(e) => {
                                                                            controlText(e) === true && setFieldValue('digit_3', e.target.value)
                                                                        }}
                                                                    />

                                                                    <InputItemField
                                                                        style={{ width: '50px', textAlign: 'center' }}
                                                                        value={values.digit_4}
                                                                        onChange={(e) => {
                                                                            controlText(e) === true && setFieldValue('digit_4', e.target.value)
                                                                        }}
                                                                    />
                                                                </Space>
                                                            </Col>
                                                            <Col md={5}>
                                                                <div
                                                                    className='d-flex align-items-end h-100 justify-content-center'
                                                                >
                                                                    <Space>
                                                                        <QBdefaultPadding>
                                                                            renvoyer le code
                                                                        </QBdefaultPadding>

                                                                        <QBActive
                                                                            onClick={() => handleSubmit()}
                                                                            loading={loading}
                                                                            disabled={loading}
                                                                        >
                                                                            VALIDER
                                                                        </QBActive>
                                                                    </Space>
                                                                </div>
                                                            </Col>
                                                            <Col md={12}>
                                                                <FormError>
                                                                    {touched.digit_1 && errors.digit_1 && <div>{errors.digit_1}</div>}
                                                                    {touched.digit_2 && errors.digit_2 && <div>{errors.digit_2}</div>}
                                                                    {touched.digit_3 && errors.digit_3 && <div>{errors.digit_3}</div>}
                                                                    {touched.digit_4 && errors.digit_4 && <div>{errors.digit_4}</div>}
                                                                </FormError>
                                                            </Col>
                                                        </Row>
                                                    </div>

                                                </Form>
                                            )}
                                        </Formik>
                                    </FormNumeroContent>
                                </div>
                            </Col>
                        </Row>
                    </SectionTopContent>
                </SectionTop>
            </Section>
        </LayoutBlanc>

    )
}
