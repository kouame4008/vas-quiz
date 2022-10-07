import * as React from 'react';
import { ContentTxt, IntoSubTitle, SectionTopContent } from '../welcome-css';
import { Space, Typography } from 'antd';
import { Row, Col } from 'react-bootstrap';
import Question from '../../../pages/quiz/components/Question';
import { QBActive, QBdefaultPadding } from '../header/css/Buttons';
import { ArrowRightOutlined } from '@ant-design/icons';
import styled from 'styled-components';





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
const { Title } = Typography;

const ListQuestion = [
    'Culture générale',
    'Sport',
    'Politique',
];

interface IQuestions {
    title: string;
    prev: Function;
    next: Function;
    done: Function;
    steps: number;
    current: number;
    seconds :number;
    minutes : number;
}


const Questions = ({ title, next, prev, current, steps, done, seconds,minutes }: IQuestions) => {

    const handleOk = () => { }

    return (

        <SectionTopContent>
            <div className='d-flex justify-content-between'>
                <Title style={{color: '#004E9C'}}>
                    {title}
                </Title>
                <span style={{ paddingTop: '10px' }}>
                    <SpanCunter>
                        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </SpanCunter>
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
                        {ListQuestion.map((item) => (
                            <Col md={4}>
                                <Question />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

            <div className='mt-2'>
                <Space>
                    <QBActive
                    // onClick={handleOk}
                    >
                        VALIDER RÉPONSE
                    </QBActive>

                    {current !== steps - 1 && <QBdefaultPadding
                        onClick={() => next()}
                    >
                        <Space>
                            <span>PASSER</span>
                            <ArrowRightOutlined />
                        </Space>
                    </QBdefaultPadding>}

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
            </div>
        </SectionTopContent>
    )
}

export default Questions;