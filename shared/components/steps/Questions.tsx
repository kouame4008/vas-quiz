import React, { useState } from 'react';
import { Circle, ContentTxt, IntoSubTitle, SectionTopContent } from '../welcome-css';
import { Button, Space, Tag, Typography } from 'antd';
import { Row, Col } from 'react-bootstrap';
import { QBActive, QBdefaultPadding } from '../header/css/Buttons';
import { ArrowRightOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setScoreData } from '../../../features/score.slice';
import { useSelector } from 'react-redux';
import { number, string } from 'yup';



const SpanCunter = styled.span`
    text-align: left;
    font: normal normal bold 40px/46px Mulish;
    font-size: 40px;
    -webkit-letter-spacing: 0px;
    -moz-letter-spacing: 0px;
    -ms-letter-spacing: 0px;
    letter-spacing: 0px;
    color: #004E9C;
    opacity: 1;
    background: #0090B833 0% 0% no-repeat padding-box;    
    font-size: 1.1rem;
    padding: 5px 1rem;
    border-radius: 10px;
`;
const SectionQuestion = styled.div`
    border: 1px solid #DEDEDE;
    border-radius: 16px;
    padding : 1.2rem 1rem;
    margin-bottom : 20px;
    cursor : pointer;
    display : flex;
    background : ${(props: { color: string; cursor: string }) => props.color};
    cursor : ${(props: { cursor: string; color: string }) => props.cursor};
    display : flex;
    justify-content : space-between;
`;

const ReponseContent = styled.div`
    padding :1rem;
    background:  0% 0% no-repeat padding-box;
    border-radius : 10px;
    display : flex;
    justify-content : space-between;
    background : ${(props: { color: string | null }) => props.color && props.color + '33'};
    .reponseTitle {
        font-family : Market;
        font-size: 30px;
        color : ${(props: { color: string | null }) => props.color && props.color}
    }
`;

const QTag = styled(Tag)`
    padding: 2px 10px;
    border-radius: 10px;
`;

const { Title } = Typography;



interface IQuestions {
    title: string;
    prev: Function;
    next: Function;
    done: Function;
    steps: number;
    current: number;
    seconds: number;
    minutes: number;
    questions: any;
};

const TYPE_REPONSE = {
    SUCCESS: 1,
    ECHEC: 0
};

const TYPE_POINTS_PAR_REPONSE = {
    SUCCESS: 3,
    ECHEC: 1,
    DEFAULT: 0
};

interface IReponse {
    correct: number;
    created_at: string;
    created_by: number;
    id: number;
    is_active: number;
    libelle: string;
    question_id: number;
    updated_at: any;
    updated_by: any
}


const Questions = ({ title, next, prev, current, steps, done, seconds, minutes, questions }: IQuestions) => {
    const [currentReponse, setCurrentReponse] = React.useState<number>(0);
    const [selectReponse, setSelectReponse] = useState(false);
    const [itemCurrent, setItemCurrent] = useState<IReponse>();
    const dispatch = useDispatch();
    const nombreDePoints = useSelector((state: any) => state.score.points);


    React.useEffect(() => {
        // reinitialisation du score au demarrage de la page
        // ou si quelau'un tente de d'actualiser la page
        console.log('current', current)
        if (current === 0) {
            dispatch(setScoreData({ points: 0 }))
        }
    }, []);


    // return la color en function du bon ou mauvais resultat
    const handleColor = (item: any): string => {
        // test de l'utilisateur courant
        if (!itemCurrent) return 'transparent';

        // mise a jour du score
        handleUpdateScore(item);

        // return la color en function du bon ou mauvais resultat
        return itemCurrent.id === item.id && selectReponse ?
            TYPE_REPONSE.SUCCESS === item.correct ?
                '#0090B833' : '#EA5C0D33' : 'transparent';
    }

    // mise a jour du score
    const handleUpdateScore = (item: IReponse) => {
        // mise a jour du score si bonne reponse
        if (TYPE_REPONSE.SUCCESS === item.correct) {
            let calculPonts = TYPE_POINTS_PAR_REPONSE.SUCCESS + parseInt(nombreDePoints)
            console.log(calculPonts)
            dispatch(setScoreData({ points: calculPonts }))
        }
        // mise a jour du score si mauvaise reponse
        else {
            let calculPonts = TYPE_POINTS_PAR_REPONSE.ECHEC + parseInt(nombreDePoints)
            console.log(calculPonts)
            dispatch(setScoreData({ points: calculPonts }))
        }
    }

    // gestion du cursor en fonction des reponses
    const handleCursor = (item: any): string => {
        if (!itemCurrent) return 'pointer';
        return !selectReponse ?
            'pointer' : itemCurrent.id === item.id && selectReponse ?
                TYPE_REPONSE.SUCCESS === item.correct ?
                    'pointer' : 'pointer' : 'no-drop';
    }

    // handleEtatReponse : renvoi la bonne ou mauvaise reponse
    const handleEtatReponse = (item: any): boolean | null => {
        if (!item) return null;
        if (!itemCurrent) return null;
        else {
            return itemCurrent.id === item.id && selectReponse ?
                TYPE_REPONSE.SUCCESS === item.correct ? true : false
                : null;
        }
    }

    // handleReponseColor : gestion des couleur pour afficher la reponse
    const handleReponseColor = (item: any): any => {
        if (!item) return null;
        else if (handleEtatReponse(item)) return '#0090B8';
        else if (!handleEtatReponse(item)) return '#EA5C0D';
        else return null
    }


    return (
        <SectionTopContent>
            <div className='d-flex justify-content-between'>
                <Title level={3} style={{ color: '#004E9C' }}>
                    <div><span>{questions && questions.libelle}  </span></div>
                    <div>
                        <Space>
                            <QTag color='cyan'>Cuture Generale</QTag>
                            <QTag color='red'>Question : {current + 1}/{steps}</QTag>
                        </Space>
                    </div>
                </Title>
                <span style={{ paddingTop: '10px' }}>
                    <Space>
                        <Button.Group
                            style={{ borderRadius: '8px', border: '0.5px solid #0090B8' }}
                        >
                            <Button style={{
                                background: '#0090B81A 0% 0% no-repeat padding-box',
                                border: 0,

                            }}>
                                <strong>Votre score</strong>
                            </Button>
                            <Button style={{
                                textAlign: 'center',
                                font: 'normal normal bold 18px/24px Mulish',
                                letterSpacing: '0px',
                                color: '#FAF6F4',
                                background: '#0090B8 0% 0% no-repeat padding-box',
                                border: 0
                            }}>
                                {nombreDePoints}
                            </Button>
                        </Button.Group>
                        <SpanCunter>
                            {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                        </SpanCunter>
                    </Space>
                </span>
            </div>
            <Row className='pt-4' style={{ borderTop: '1px solid rgba(0,0,0,.1)', borderBottom: '1px solid rgba(0,0,0,.1)' }}>
                <Col md={4} xs={4}>
                    <ContentTxt style={{ alignItems: 'flex-start' }}>
                        <section>
                            <IntoSubTitle style={{ color: '#000' }}>
                                Sed ut perspiciatis unde omnis iste natus error
                                sit voluptatem accusantium doloremque laudantium, totam rem
                                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                            </IntoSubTitle>
                        </section>
                    </ContentTxt>
                </Col>
                <Col md={12}>
                    <Row>
                        {questions && questions.answers.map((item: any, index: number) => (
                            <Col md={4}>
                                <SectionQuestion
                                    onClick={() => {
                                        if (!selectReponse) {
                                            console.log(item)
                                            setCurrentReponse(item.id);
                                            setSelectReponse(true);
                                            setItemCurrent(item);
                                            handleUpdateScore(item)
                                        }
                                    }}
                                    color={handleEtatReponse(item) === true ?
                                        '#0090B833' : handleEtatReponse(item) === false ?
                                            '#EA5C0D33' : 'transparent'}
                                    cursor={!selectReponse ?
                                        'pointer' : itemCurrent && itemCurrent.id === item.id && selectReponse ?
                                            TYPE_REPONSE.SUCCESS === item.correct ?
                                                'pointer' : 'pointer' : 'no-drop'}
                                >
                                    <span> {item.libelle} </span>
                                    <span style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Circle dimension='50px' >
                                            {handleEtatReponse(item) == true ?
                                                <CheckOutlined /> : handleEtatReponse(item) == false ? <CloseOutlined />
                                                    : null}
                                        </Circle>
                                    </span>
                                </SectionQuestion>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            <div className='mt-2'>
                {handleEtatReponse(itemCurrent) !== null &&
                    <ReponseContent color={handleReponseColor(itemCurrent)}>
                        <div className='reponseHeader'>
                            <span className='reponseTitle d-block w-100'>
                                {handleEtatReponse(itemCurrent) == true ?
                                    ' Bonne réponse !' : handleEtatReponse(itemCurrent) == false ? ' Mauvaise réponse !'
                                        : null}
                            </span>
                            <span className='reponseSubTitle d-block w-100'>On ne se décourage pas, on se concentre et on continue.</span>
                        </div>
                        <Space>

                            {current !== steps - 1 &&
                                <QBActive
                                    onClick={() => next()}
                                >
                                    <Space>
                                        <span>QUESTION SUIVANTE</span>
                                        <ArrowRightOutlined />
                                    </Space>
                                </QBActive>}

                            {current === steps - 1 && (
                                <QBdefaultPadding
                                    onClick={() => done()}
                                >
                                    <Space>
                                        <span>TERMINER</span>
                                        <ArrowRightOutlined />
                                    </Space>
                                </QBdefaultPadding>
                            )}

                        </Space>
                    </ReponseContent>}
            </div>
        </SectionTopContent>
    )
}

export default Questions;