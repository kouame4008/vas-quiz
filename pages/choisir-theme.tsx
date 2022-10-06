import { useRouter } from 'next/router';
import React from 'react';
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
} from './welcome/components/css';
import {
    Formik,
    Form,
    Field,
} from 'formik';
import * as Yup from 'yup';
import { FormError, InputItemField, InputItemNumberField } from '../shared/components/formComponent';
import { QBActive, QBdefaultPadding } from '../shared/components/header/css/Buttons';
import { Space } from 'antd';
import Theme from './welcome/components/card/Theme';

const phoneRegExp = /(07)[1-9]*(\d)/;

interface Idigit {
    digit_1: string;
    digit_2: string;
    digit_3: string;
    digit_4: string;
}

const ListTheme = [
    'Culture générale',
    'Sport',
    'Politique',
    'Musique',
    'Arts',
    'Culture générale'
]

export default function () {
    const router = useRouter ();
    const handleSubmitForm = (values: Idigit) => { }

    const hanlderedirectRoute = () => {
        router.push ('/welcome')
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
        <AppLayout title='Quiz' description='Quiz'>
            <Navbar style={{ boxShadow: 'rgba(0, 0, 0, 0.01) 0px 10px 27px' }}>
                <Header />
            </Navbar>

            <Section>
                <SectionTop color='FFF'>
                    <SectionTopContent>
                        <Row className='pt-4'>
                            <Col md={4} xs={4}>
                                <ContentTxt>
                                    <section>
                                        <IntoTitle style={{ fontSize: '56px' }}>
                                            Sélectionnez  <br />  un thème  <br />
                                        </IntoTitle>
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
                                        <Col md={4} onClick={hanlderedirectRoute}>
                                            <Theme title={item} />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </SectionTopContent>
                </SectionTop>
            </Section>
        </AppLayout>

    )
}
