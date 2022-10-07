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
import {  Typography } from 'antd';
import { QBActive } from '../../shared/components/header/css/Buttons';
import Card from './components/card/Card';
import LotaGagner from './components/card/LotaGagner';
import { ModalChoisirOptions } from '../../shared/components/modal/QuizModalActions';
import Img_carte_classement from '../../public/assets/Img_carte_classement.png';
import Img_carte_Formule_normale from '../../public/assets/Img_carte_Formule_normale.png';
import Img_carte_formule_turbo from '../../public/assets/Img_carte_formule_turbo.png';
import HeaderImg from '../../public/assets/Header_img.png';
import LogoQuiz from '../../public/assets/Logo_quiz.png';
import Image from 'next/image';
import Header from '../../shared/components/header/Header';



const { Title } = Typography;

const cardData = [
    {
        title: 'Classement',
        description: 'Découvrez vos meilleurs scores et votre rang dans le jeu.',
        image : Img_carte_classement,
        color : 'rgba(250, 246, 244, 1) 0% 0% no-repeat padding-box',
        formule : ' Pour cette formule vous serez prélevez d’un montant de 103 FCFA. Vous donnant droit à un pack de 03  question.'
    },
    {
        title: 'Formule Normale',
        description: 'Cette formule vous donne droit à un pack de trois questions.',
        image : Img_carte_Formule_normale,
        color : 'rgba(0, 144, 184, 0.4)  0% 0% no-repeat padding-box',
        formule : ' Pour cette formule vous serez prélevez d’un montant de 103 FCFA. Vous donnant droit à un pack de 03  question.'
    },
    {
        title: 'Formule Turbo',
        description: 'Cette formule vous donne droit à un pack de trois questions.',
        image : Img_carte_formule_turbo,
        color : 'rgba(255, 169, 0, 0.4) 0% 0% no-repeat padding-box',
        formule : ' Pour cette formule vous serez prélevez d’un montant de 203 FCFA. Vous donnant droit à un pack de 03  question.'

    }
]

const Accueil: NextPage = () => {
    const [visible, setVisible] = useState(false);
    const [chargement, setChargement] = useState(false);
    const [current, setCurrent] = useState ({});
    const router = useRouter()

    const handleOpenModal = (index: number,item: any) => {
        if (visible === false) {
            setCurrent (item)
            setVisible(true)
        }
        else {
            setVisible(false)
            setCurrent ({})
        }
    }

    const handleSubmit = () => {
        setChargement (true)
        router.push('/quiz')
    }

    return (
        <AppLayout title='Quiz' description='Quiz'>
            <Section>
                <SectionTop color='grey'>
                    <Navbar>
                        <Header logo={LogoQuiz} />
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
                                        <QBActive>
                                            lire le règlement
                                        </QBActive>
                                    </section>
                                </ContentTxt>
                            </Col>
                            <Col md={4} xs={4}>
                                <ContentCircle>
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
                    <Row>
                        {cardData.map((item, index) => (
                            <Col md={4} onClick={() => handleOpenModal(index,item)}>
                                <Card
                                    title={item.title}
                                    description={item.description}
                                    image={item.image}
                                    handlePlus={()=> handleOpenModal(index,item)}
                                    color={item.color}
                                />
                            </Col>
                        ))}
                    </Row>

                    <div className='d-flex justify-content-center pt-4 flex-column'>
                        <Title level={2} className='text-center' style={{ color : '#004E9C' }}>Joue et gagne de nombreux lots !</Title>
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

        </AppLayout>


    )
}

export default Accueil;
