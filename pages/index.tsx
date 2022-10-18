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
import { QBActive } from '../shared/components/header/css/Buttons';
import LayoutBlanc from '../shared/layouts/LayoutBlanc';
import useCategorie from './api/categorie/use-categories';
import { login_user_by_phone_number } from './api/user/user-actions';
import { notification } from 'antd';

// REgex numero orange
const phoneRegExp = /(07)[1-9]*(\d)/;

// demarage de la page
const Accueil = () => {
  // router pour gerer la navigation des pages
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const { categories, chargementCategories } = useCategorie();

  // handleSubmitForm permet de soumettre de formulaire
  const handleSubmitForm = (values: { phone_number: string }) => {
    setLoading(true);
    let data = {
      phone_number: values.phone_number
    }

    login_user_by_phone_number(data).then((res) => {
      setLoading(false);
      if (res.status == 'succes') {

        // Enregistrement dans la session
        localStorage.setItem('OTP', res.opt);
        localStorage.setItem('PHONE_NUMBER', values.phone_number);

        router.push('/verifier-otp')
      }
    }).catch(() => {
      notification.error({
        description: 'Erreur server !',
        message: 'Error',
        placement: 'bottomRight'
      })
    })
  }

  // validationSchema permet de valider les champs du formulaire
  const validationSchema = Yup.object().shape({
    phone_number: Yup.string()
      .required('Le champ numero de telephone est requis')
      .min(10, 'Le numero de telephone est de 10 caractères')
      .max(10, 'Le numero de telephone est de 10 caractères')
      .matches(phoneRegExp, 'Le numero de telephone doit commencer par (07)')
  });

  // controlText permets de filtre et retirer les caracteres alphabetique lorsque le client 
  // tape sur le clivier pour entrer sont numero
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
              <Col md={5} xs={12}>
                <ContentTxt>
                  <section>
                    <IntoTitle style={{ fontSize: '56px', color: '#004E9C' }}>
                      Joue. <br /> Apprends. <br /> Gagne.
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
              <Col md={7} xs={12}>
                <div className='d-flex align-items-end w-100 h-100 justify-content-end'>
                  {/* debut du Formnulaire */}
                  <FormNumeroContent>
                    <Formik
                      initialValues={{
                        phone_number: '',
                      }}
                      onSubmit={(values: { phone_number: string }) => handleSubmitForm(values)}
                      validationSchema={validationSchema}
                    >
                      {({ values, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                        <Form>
                          <div className="current-steep-content">
                            <Row>
                              <Col md={10}>
                                <label htmlFor="firstName">Enregistre toi avec ton numéro de téléphone. <sup>*</sup></label>
                                <InputItemField
                                  value={values.phone_number}
                                  onChange={(e) => {
                                    controlText(e) === true && setFieldValue('phone_number', e.target.value)
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
                                    loading={loading}
                                    disabled={loading}
                                  >
                                    VALIDER
                                  </QBActive>
                                </div>
                              </Col>
                              <Col md={12}>
                                <FormError>
                                  {touched.phone_number && errors.phone_number && <div>{errors.phone_number}</div>}
                                </FormError>
                              </Col>
                            </Row>
                          </div>

                        </Form>
                      )}
                    </Formik>
                  </FormNumeroContent>
                  {/* Fin du Formulaire */}
                </div>
              </Col>
            </Row>
          </SectionTopContent>
        </SectionTop>
      </Section>
    </LayoutBlanc>
  )
}

export default Accueil;
