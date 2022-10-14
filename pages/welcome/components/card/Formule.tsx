import { useRouter } from 'next/router';
import React from 'react';
import { Col, Row } from 'react-bootstrap';


import { Spin } from 'antd';
import Card from './Card';
import Img_carte_classement from '../../../../public/assets/Img_carte_classement.png';
import Img_carte_Formule_normale from '../../../../public/assets/Img_carte_Formule_normale.png';

// import { IPack } from '../api/config/interface/Interface';÷
import { v4 } from 'uuid';
import usePacks from '../../../api/pack/use-pack';
import { IPack } from '../../../api/config/interface/Interface';




const cardData = [
    {
        title: 'Classement',
        description: 'Découvrez vos meilleurs scores et votre rang dans le jeu.',
        image: Img_carte_classement,
        color: 'rgba(250, 246, 244, 1) 0% 0% no-repeat padding-box',
        formule: ' Pour cette formule vous serez prélevez d’un montant de 103 FCFA. Vous donnant droit à un pack de 03  question.'
    }
];

interface IFormule {
    handleOpenModal: Function;
}

const Formule = ({
    handleOpenModal
}: IFormule) => {
    const { packs, chargementPacks } = usePacks();
    const router = useRouter()


    return (
        <Spin spinning={chargementPacks}>
            <Row>
                {cardData.map((item, index) => (
                    <Col md={4} key={index} onClick={() => { router.push(`/score/${v4()}`) }}>
                        <Card
                            title={item.title}
                            description={item.description}
                            image={item.image}
                            handlePlus={() => handleOpenModal(index, item)}
                            color={item.color}
                        />
                    </Col>
                ))}

                {typeof packs !== 'undefined' &&
                    <>
                        {packs && packs.map((item: IPack, index: number) => (
                            <Col md={4} key={index} onClick={() => handleOpenModal(index, item)}>
                                <Card
                                    title={item.type_pack}
                                    description={`Cette formule vous donne droit à un pack de (${item.nombre_question}) question(s).`}
                                    image={Img_carte_Formule_normale}
                                    handlePlus={() => handleOpenModal(index, item)}
                                    color={index % 2 == 1 ? 'rgba(255, 169, 0, 0.4)' : 'rgba(0, 144, 184, 0.4)'}
                                />
                            </Col>
                        ))}
                    </>
                }

            </Row>


        </Spin>
    )
}

export default Formule;