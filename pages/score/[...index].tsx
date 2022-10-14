import { Divider, notification, Space } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import LayoutBlanc from '../../shared/layouts/LayoutBlanc';
import IconWeek from '../../public/assets/icon-week.png';
import IconMois from '../../public/assets/icon-mois.png';
import Formule from '../welcome/components/card/Formule';
import { IPack } from '../api/config/interface/Interface';
import { ModalChoisirOptions, ModalDemarrerLeJeu } from '../../shared/components/modal/QuizModalActions';
import { souscription_pack } from '../api/pack/pack-actions';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';


const ScorePanel = styled.div`
    background: rgba(0, 144, 184, 0.2)  0% 0% no-repeat padding-box;
    border-radius: 16px;
    padding: 1rem;
    text-align : center;
`;

const Score = styled.div`
    text-align: center;
    font: normal normal bold 56px/66px Mulish;
    letter-spacing: 0px;
    color: rgba(0, 78, 156, 1);
`;

const ClaasementPanel = styled.div`
   display : flex;
   justify-content : space-between;
`;

const ClassmentTxt = styled.div``;
const Classment = styled.div`
    text-align: left;
    font: normal normal bold 32px/38px Mulish;
    letter-spacing: 0px;
    color: rgba(28, 31, 34, 1);
`;

const MonScore = () => {
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState<IPack | undefined>();
    const [chargement, setChargement] = useState(false);
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
        <LayoutBlanc>
            <Container>
                <Row className='mt-4'>
                    <Col md={3}>
                        <ScorePanel>
                            <Space direction='vertical'>
                                <strong>Votre score totol</strong>
                                <Score>5</Score>
                                <span>Point(s)</span>
                            </Space>
                        </ScorePanel>
                    </Col>
                    <Col md={9}>
                        <ClaasementPanel className='mt-2'>
                            <ClassmentTxt>
                                <Space>
                                    <div>
                                        <Image
                                            src={IconWeek.src}
                                            width={IconWeek.width}
                                            height={IconWeek.height}
                                        />
                                    </div>
                                    <div>
                                        <strong className='d-block'>Classement hebdomadaire</strong>
                                        <small>Quisquam, fuga! Perferendis consequatur mecuius ut, </small>
                                    </div>
                                </Space>
                            </ClassmentTxt>
                            <Classment>3e</Classment>
                        </ClaasementPanel>
                        <Divider />
                        <ClaasementPanel>
                            <ClassmentTxt>
                                <Space>
                                    <div>
                                        <Image
                                            src={IconMois.src}
                                            width={IconMois.width}
                                            height={IconMois.height}
                                        />
                                    </div>
                                    <div>
                                        <strong className='d-block'>Classement Mensuel</strong>
                                        <small>Quisquam, fuga! Perferendis consequatur mecuius ut, </small>
                                    </div>
                                </Space>
                            </ClassmentTxt>
                            <Classment>5e</Classment>
                        </ClaasementPanel>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2.2rem' }}>
                    <Formule handleOpenModal={handleOpenModal} />
                </Row>

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
            </Container>
        </LayoutBlanc>
    )
}

export default MonScore;