import { Avatar, Button, Skeleton, Space, Typography } from "antd";
import { CardBody, Circle } from "../welcome-css";
import { QBActive, QBdefaultPadding } from "../header/css/Buttons";
import { IModalChoisirFormule } from "../../../pages/api/config/interface/Interface";
import QuizModal from "./QuizModal"
import Image from "next/image";
import Img_carte_Formule_normale from '../../../public/assets/Img_carte_Formule_normale.png';
import BgDemarrer from '../../../public/assets/Groupe.png';
import styled from "styled-components";
import { CheckCircleFilled, CheckOutlined, TagOutlined } from "@ant-design/icons";
import { useState } from "react";
import useCategorie from "../../../pages/api/categorie/use-categories";

const CategorieWrapper = styled.div`
    background: ${(props: { color: string }) => props.color};
    border: 0;
    border-radius: 8px;
    padding: 5px 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
`;

const SpanColor = styled.span`
    padding: 2px 5px;
    border-radius: 5px;
    color: #FFF;
    background: #004E9C;
`;

const Fade = require('react-reveal/Fade');


export const ModalChoisirOptions = ({
    visible,
    close,
    handleOk,
    currentItem,
    loading
}: IModalChoisirFormule) => {
    const [currentCategorie, setCurrentCategorie] = useState<number>(0);
    const [radio, setRadio] = useState<boolean>(false);
    const { categories, chargementCategories } = useCategorie()

    return (
        <QuizModal
            visible={visible}
            close={close}
            width={'800px'}

        >
            <CardBody color="transparent">
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 600, textTransform: 'uppercase' }}> {currentItem && currentItem.type_pack} </h3>
                    <div>
                        Pour cette formule vous serez prélevez <br /> d’un montant de {currentItem && currentItem.montant} FCFA. Vous donnant droit à un pack de {currentItem && currentItem.nombre_question}  question(s).
                    </div> <br />
                    <div>
                        {currentItem && currentItem.description}
                    </div>

                </div>
                <div style={{ width: '150px', height: '150px' }}>
                    {currentItem && <Image
                        src={Img_carte_Formule_normale.src}
                        width={Img_carte_Formule_normale.width}
                        height={Img_carte_Formule_normale.height}
                    />}
                </div>
            </CardBody>
            <div style={{ padding: '1rem' }}>
                <strong className="mb-2 d-flex">Veuillez choisir une catégorie (<strong className="text-danger">*</strong>) </strong>
                <Skeleton loading={chargementCategories}>
                    <div className="row">
                        {categories && categories.map((item: any, index: number) => (
                            <div className="col-md-4" key={index}>
                                <CategorieWrapper onClick={() => {
                                    setCurrentCategorie(item.id);
                                    setRadio(true)
                                }} color={currentCategorie === item.id && radio ? 'rgba(57, 152, 37, 0.5)' : '#FAF6F4'}>
                                    <Space>
                                        <Avatar icon={<TagOutlined />} />
                                        <span> {item.nom} </span>
                                    </Space>
                                    {currentCategorie === item.id && radio &&
                                        <Button size="small" style={{ background: 'transparent', marginTop: '5px' }} shape={'circle'}>
                                            <CheckOutlined />
                                        </Button>}
                                </CategorieWrapper>
                            </div>
                        ))}
                    </div>
                </Skeleton>
                {radio &&
                    <Fade bottom>
                        <div className='mt-2'>
                            <Space>
                                <QBActive
                                    onClick={() => handleOk(currentItem, currentCategorie)}
                                    loading={loading && loading}
                                    disabled={loading && loading}
                                >
                                    PAYER MAINTENANT ({currentItem && currentItem.montant} FCFA)
                                </QBActive>

                                <QBdefaultPadding
                                    onClick={close}
                                >
                                    ANNULER
                                </QBdefaultPadding>
                            </Space>
                        </div>
                    </Fade>}
            </div>
        </QuizModal>
    );
}

export const ModalDemarrerLeJeu = ({
    visible,
    close,
    handleOk,
    currentItem,
    loading
}: IModalChoisirFormule) => {

    return (
        <QuizModal
            visible={visible}
            close={close}
            width={'550px'}
            style={{
                background: `url(${BgDemarrer.src})`,
                backgroundSize: 'cover'
            }}
        >
            <CardBody color="transparent">
                <div style={{ width: '250px', height: '150px', opacity: 0 }}>
                    {currentItem && <Image
                        src={Img_carte_Formule_normale.src}
                        width={Img_carte_Formule_normale.width}
                        height={Img_carte_Formule_normale.height}
                    />}
                </div>
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '23px', fontWeight: 600, textTransform: 'uppercase', fontFamily: 'Market',color:'#004E9C' }}> Félicitation </h3>
                    <div>
                        Vous venez de souscrire au (<strong>PACK {currentItem && currentItem.type_pack}</strong>),
                        Vous avez ete debite <br /> de  <SpanColor><strong> {currentItem && currentItem.montant} FCFA</strong></SpanColor>
                    </div>

                    <div className='mt-4'>
                        <Fade bottom>
                            <div>
                                <Space>
                                    <QBActive
                                        onClick={() => handleOk()}
                                        loading={loading && loading}
                                        disabled={loading && loading}
                                    >
                                        Commencer Maintenant
                                    </QBActive>
                                </Space>
                            </div>
                        </Fade>
                    </div>


                </div>

            </CardBody>

        </QuizModal>
    );
}


export const ModalExpiredTimer = ({
    visible,
    close,
    handleOk,
    loading,
}: IModalChoisirFormule) => {

    return (
        <QuizModal
            visible={visible}
            close={close}
        >
            <CardBody color="transparent">
                <div style={{ width: '150px' }}>
                    <Circle dimension='150px' />
                </div>
                <div style={{ flex: 1, padding: '1rem' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 600 }}> Votre temps est ecoulé </h3>
                    <span>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    </span>
                    <div className='mt-2'>
                        <Space>
                            <QBActive
                                onClick={() => handleOk()}
                                loading={loading && loading}
                                disabled={loading && loading}
                            >
                                CONTINUER
                            </QBActive>

                            <QBdefaultPadding
                                onClick={close}
                            >
                                ANNULER
                            </QBdefaultPadding>
                        </Space>
                    </div>
                </div>
            </CardBody>
        </QuizModal>
    );
}

