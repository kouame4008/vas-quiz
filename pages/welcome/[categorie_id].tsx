import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AppLayout from '../../shared/layouts/AppLayout';
import { Col, Navbar, Row } from 'react-bootstrap';

import {
    Section,
    SectionTop,
    SectionTopContent,
    ContentCircle,
    ContentTxt,
    IntoTitle,
    IntoSubTitle,
    SectionMain,
} from '../../shared/components/welcome-css';
import { notification, PageHeader, Spin, Typography } from 'antd';
import { QBActive } from '../../shared/components/header/css/Buttons';
import Card from './components/card/Card';
import LotaGagner from './components/card/LotaGagner';
import { ModalChoisirOptions, ModalDemarrerLeJeu } from '../../shared/components/modal/QuizModalActions';
import HeaderImg from '../../public/assets/Header_img.png';
import LogoQuiz from '../../public/assets/Logo_quiz.png';
import Image from 'next/image';
import Header from '../../shared/components/header/Header';
import { IPack } from '../api/config/interface/Interface';
import { v4 } from 'uuid';
import { souscription_pack } from '../api/pack/pack-actions';
import Cookies from 'js-cookie';
import Formule from './components/card/Formule';
import styled from 'styled-components';
import CommentJouer from './components/card/CommentJouer';



const { Title } = Typography;

const PartirEnCours = styled.div`
    background: #FAF6F4 0% 0% no-repeat padding-box;
    box-shadow: 0px 32px 38px #CBBEB780;
    margin-bottom: 50px;
    border-radius: 18px;
`;


const Accueil: NextPage = () => {
    const [visible, setVisible] = useState(false);
    const [chargement, setChargement] = useState(false);
    const [current, setCurrent] = useState<IPack | undefined>();
    const router = useRouter();
    const [demarrerModal, setDemarrerModal] = useState(false);
    const [currentSuscription, setCurrentSuscription] = useState();


    const handleOpenModal = (index: number, item: any) => {
        if (visible === false) {
            setCurrent(item)
            setVisible(true)
        }
        else {
            setVisible(false)
            setCurrent(undefined)
        }
    }

    const handleSubmit = (pack: any, categorie_id: any) => {
        setChargement(true);
        // setVisible(false);
        let data = {
            pack_id: pack.id,
            category_id: categorie_id
        }

        // souscrire a un pack
        souscription_pack(data).then((res: any) => {
            setChargement(false);
            console.log('res', res)
            if (res.status === 'succes') {
                setVisible(false);
                setCurrentSuscription(res.data.subscription.id)
                handleModalDemarrerJeu()
            }
            else {
                notification.error({
                    message: res.status,
                    description: res.message,
                    placement: 'bottomRight'
                })
            }
        });

        // current && router.push(`/categorie/${current.id}/${v4()}`)
    }

    const handleModalDemarrerJeu = () => {
        if (demarrerModal === false) {
            setDemarrerModal((show: boolean) => !show);
        }
        else {
            setDemarrerModal((show: boolean) => !show);
        }
    }

    const handleDemarrer = () => {
        setChargement(true)
        let date = new Date();

        Cookies.set('time_in_minuterie', `${3600}`)
        router.push(`/quiz/${currentSuscription}|${v4()}|${date.getTime()}`)
    }

    return (
        <AppLayout title='Quiz' description='Quiz'>
            <Section>
                <SectionTop color='grey'>
                    <Navbar>
                        <Header type='blue' logo={LogoQuiz} />
                    </Navbar>
                    <SectionTopContent>
                        <Row>
                            <Col md={8} xs={12}>
                                <ContentTxt>
                                    <section>
                                        <IntoTitle>
                                            Bienvenue sur <br /> Quiz Cote d'Ivoire
                                        </IntoTitle>
                                        <IntoSubTitle>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo
                                        </IntoSubTitle>
                                        <QBActive onClick={() => { router.push('/reglement') }}>
                                            lire le règlement
                                        </QBActive>
                                    </section>
                                </ContentTxt>
                            </Col>
                            <Col md={4} xs={12} className='my-2'>
                                <ContentCircle className='welcome-img'>
                                    <Image
                                        src={HeaderImg.src}
                                        width={HeaderImg.width}
                                        height={HeaderImg.height}
                                    />
                                </ContentCircle>
                            </Col>
                        </Row>
                    </SectionTopContent>
                </SectionTop>

                <SectionMain>
                    <PartirEnCours>
                        <PageHeader
                            title={'Vous avez une partie en cours.'}
                            extra={[
                                <QBActive>
                                    CONTINUER
                                </QBActive>
                            ]}
                            style={{ borderRadius: '18px' }}
                        />
                    </PartirEnCours>
                    <Formule handleOpenModal={handleOpenModal} />

                    <CommentJouer />

                    <div className='d-flex justify-content-center pt-4 flex-column'>
                        <Title level={2} className='text-center' style={{ color: '#004E9C' }}>Joue et gagne de nombreux lots !</Title>
                        <span className='text-center'>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium  <br />
                            doloremque laudantium, totam rem aperiam.
                        </span>
                    </div>

                    <LotaGagner />
                </SectionMain>

            </Section>

            {visible &&
                <ModalChoisirOptions
                    visible={visible}
                    close={handleOpenModal}
                    handleOk={handleSubmit}
                    currentItem={current}
                    loading={chargement}
                />}

            {demarrerModal &&
                <ModalDemarrerLeJeu
                    visible={demarrerModal}
                    close={handleModalDemarrerJeu}
                    handleOk={handleDemarrer}
                    currentItem={current}
                    loading={chargement}
                />}

        </AppLayout>


    )
}

export default Accueil;
