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
  ContentCircle,
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
import { QBActive } from '../shared/components/header/css/Buttons';

const phoneRegExp = /(07)[1-9]*(\d)/;

export default function () {
  const router = useRouter ()

  const handleSubmitForm = (values: { numero: string }) => {
     router.push ('/verifier-otp')
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
            <Row>
              <Col md={5} xs={4}>
                <ContentTxt>
                  <section>
                    <IntoTitle style={{ fontSize: '56px' }}>
                      Joue. <br /> Apprends. <br /> Gagne.
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
              <Col md={7} xs={4}>
                <div className='d-flex align-items-end w-100 h-100 justify-content-end'>
                  <FormNumeroContent>
                    <Formik
                      initialValues={{
                        numero: '',
                      }}
                      onSubmit={(values: { numero: string }) => handleSubmitForm(values)}
                      validationSchema={validationSchema}
                    >
                      {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                        <Form>
                          <div className="current-steep-content">
                            <Row>
                              <Col md={10} style={{ paddingLeft: '0' }}>
                                <label htmlFor="firstName">Enregistre toi avec ton numéro de téléphone. <sup>*</sup></label>
                                <InputItemField
                                  value={values.numero}
                                  onChange={(e) => {
                                     controlText (e) === true && setFieldValue ('numero', e.target.value)
                                  }}
                                  placeholder="Ex: 0777952356"
                                  type='tel'
                                />
                              </Col>
                              <Col md={2}>
                                <div
                                  className='d-flex align-items-end h-100 justify-content-center'
                                >
                                  <QBActive
                                    onClick={() => handleSubmit()}
                                  >
                                    VALIDER
                                  </QBActive>
                                </div>
                              </Col>
                              <Col md={12}>
                                <FormError>
                                  {touched.numero && errors.numero && <div>{errors.numero}</div>}
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
    </AppLayout>

  )
}
