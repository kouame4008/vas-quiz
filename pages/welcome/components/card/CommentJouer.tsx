import * as React from 'react';
import { Space, Typography } from 'antd';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { CirclePlus } from '../../../../shared/components/welcome-css';

const { Title } = Typography;

const RegleDuJeu = styled.div`
    display : flex;
    padding: 15px 10px;
    background: #faf6f4;
    border-radius: 10px;
`;

const Commentjoue = [
    {
        id: 1,
        title: 'Choisissez une formule.',
        desc: 'Normale (103 F - 3 questions) <br /> Turbo (306 F - 5 questions)'
    },
    {
        id: 2,
        title: 'Répondez aux questions.',
        desc: 'Afin d’obtenir un meilleur <br /> score.'
    },
    {
        id: 3,
        title: 'Jouez et rejouez plus souvent.',
        desc: 'Améliorez vos scores <br /> hebdomadaires et mensuels..'
    }
]

const CommentJouer = () => {
    function createMarkup(textTransform: string) {
        return { __html: textTransform };
    }

    return (
        <React.Fragment>
            <div className='d-flex justify-content-center pt-4 flex-column'>
                <Title level={2} className='text-center' style={{ color: '#004E9C' }}>Comment jouer au quiz Côte d’Ivoire ? </Title>
                <span className='text-center'>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                </span>
            </div>
            <Container>
                <Row className="justify-content-md-center py-4 my-4">
                    <Col md={10} >
                        <Row>
                            {Commentjoue.map((item, index) => (
                                <Col md={4} className='my-3'>
                                    <RegleDuJeu>
                                        <Space>
                                            <CirclePlus dimension='50px'>
                                                {index + 1}
                                            </CirclePlus>
                                            <div>
                                                <Title level={5} style={{ margin: 0 }}> {item.title} </Title>
                                                <span dangerouslySetInnerHTML={createMarkup(item.desc)}></span>
                                            </div>
                                        </Space>
                                    </RegleDuJeu>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default CommentJouer;