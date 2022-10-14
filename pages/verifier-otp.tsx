import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import {
    Section,
    SectionTop,
    SectionTopContent,
    ContentTxt,
    IntoTitle,
    IntoSubTitle,
    FormNumeroContent
} from '../shared/components/welcome-css';
import {
    Formik,
    Form,
} from 'formik';
import * as Yup from 'yup';
import { FormError, InputItemField } from '../shared/components/formComponent';
import { QBActive, QBdefaultPadding } from '../shared/components/header/css/Buttons';
import { notification, Space } from 'antd';
import LayoutBlanc from '../shared/layouts/LayoutBlanc';
import { Idigit } from './api/config/interface/Interface';
import { v4 } from 'uuid';
import { login_user_check_otp } from './api/user/user-actions';
import { useDispatch } from 'react-redux';
import { setUserData } from '../features/user.slice';




export default function () {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    // handleSubmitForm permet de soumettre de formulaire
    const handleSubmitForm = (values: Idigit, resetForm: any) => {
        setLoading(true)
        // regroupement des digits et du numero de telephone

        let data = {
            otp: `${values.digit_1}${values.digit_2}${values.digit_3}${values.digit_4}`,
            phone_number: localStorage.getItem('PHONE_NUMBER')
        }

        // Check login service
        login_user_check_otp(data).then((res) => {
            setLoading(false);
            if (res.status === 'succes') {
                // reformated user data
                let userData = {
                    user: {
                        user_id: res.user_id,
                        user_phone: res.user_phone
                    },
                    accessToken: res.token
                }
                //  envoie des donnees dans le store
                dispatch(setUserData(userData));

                //  Vider le storage
                localStorage.clear();


                router.push(`/welcome/${v4()}`)
            } else {
                // vider les champs du formulaire
                resetForm({
                    values: { digit_1: '', digit_2: '', digit_3: '', digit_4: '', }
                })
                notification.error({
                    message: res.status,
                    description: res.message
                })
            }
        }).catch(() => {
            notification.error({
                message: 'Error',
                description: 'Network Error'
            })
        });

    }

    // validationSchema permet de valider les champs du formulaire
    const validationSchema = Yup.object().shape({
        digit_1: Yup.string()
            .required('Le digit 1 est requis')
            .min(1, 'Le digit doit etre de 1 caractère')
            .max(1, 'Le digit doit etre de 1 caractère'),
        digit_2: Yup.string()
            .required('Le digit 2 est requis')
            .min(1, 'Le digit doit etre de 1 caractère')
            .max(1, 'Le digit doit etre de 1 caractère'),
        digit_3: Yup.string()
            .required('Le digit 3 est requis')
            .min(1, 'Le digit doit etre de 1 caractère')
            .max(1, 'Le digit doit etre de 1 caractère'),
        digit_4: Yup.string()
            .required('Le digit 4 est requis')
            .min(1, 'Le digit doit etre de 1 caractère')
            .max(1, 'Le digit doit etre de 1 caractère')
    });

    // controlText permets de filtre et retirer les caracteres alphabetique lorsque le client 
    // tape sur le clivier pour entrer sont numero
    const controlText = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            // console.log (e)
            if ((e.target.value).length === 1 || e.target.value === '') {
                return true;
            }
            return false;
        }
        return false;
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
                                        <IntoTitle style={{ fontSize: '56px', color: '#004E9C' }}>
                                            Encore une <br />  Étape ! <br />
                                            OPT : {localStorage && localStorage.getItem('OTP')}
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
                                    {/* Debut du formulaire */}
                                    <FormNumeroContent>
                                        <Formik
                                            initialValues={{
                                                digit_1: '',
                                                digit_2: '',
                                                digit_3: '',
                                                digit_4: '',
                                            }}
                                            onSubmit={(values: Idigit, { resetForm }) => handleSubmitForm(values, resetForm)}
                                            validationSchema={validationSchema}
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
                                                                    {touched.digit_1 && errors.digit_1 && <span>{errors.digit_1},</span>}
                                                                    {touched.digit_2 && errors.digit_2 && <span>{errors.digit_2},</span>}
                                                                    {touched.digit_3 && errors.digit_3 && <span>{errors.digit_3},</span>}
                                                                    {touched.digit_4 && errors.digit_4 && <span>{errors.digit_4}</span>}
                                                                </FormError>
                                                            </Col>
                                                        </Row>
                                                    </div>

                                                </Form>
                                            )}
                                        </Formik>
                                    </FormNumeroContent>
                                    {/* Fin du formulaire */}
                                </div>
                            </Col>
                        </Row>
                    </SectionTopContent>
                </SectionTop>
            </Section>
        </LayoutBlanc>

    )
}
