import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';


const AppFooter = styled.footer`
    
`;

const FooterBottom = styled.div`
    padding : 1rem;
    background: #E2E2E2 0% 0% no-repeat padding-box;
`;
const AppFooterTop = styled.div`
    background: #F0F0F0 0% 0% no-repeat padding-box;
    padding : 1rem;
`;

const FormRound = styled.div`
    width : 50px;
    height : 50px;
    background : #FFF;
    margin-right : 10px;
    border-radius : 10px;
   
`;

const SmallTxt = styled.small`
    margin-right: 10px;
    margin-top: 7px;
    border-radius: 10px;
    font-size : 13px;
`;

const ListFooter = styled.ul`
    margin: 0;
    list-style: none;
    padding: 0;

    li {
        display: inline-block;
        padding: 5px 1rem;
        position: relative;
        font-size: 14px;

        &:after {
            content : '|';
            position : absolute;
            right : 0;
            top : 5px;
        }

        &:last-child {
            &:after {
                content : '';
            }
        }
    }

   

`;

const LIST = ['Règlement du Jeu ', 'Qui sommes-nous', 'Mentions légales', 'FAQ']

const Footer = () => {
    return (
        <AppFooter>
            <AppFooterTop>
                <Container>
                    <Row>
                        <Col md={6}>
                            <div className='d-flex'>
                                <FormRound />
                                <SmallTxt style={{ flex: 1 }}>
                                    Quiz Côte d’Ivoire est un produit VAS Technologie <br />
                                    Sed ut  perspiciatis unde omnis iste natus error sit
                                </SmallTxt>
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className='d-flex justify-content-end'>
                                <ListFooter>
                                    {LIST.map((item, index) => (
                                        <li> {item} </li>
                                    ))}
                                </ListFooter>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </AppFooterTop>
            <FooterBottom>
                <Container>
                    <SmallTxt>2022 Copyright - VAS technologies</SmallTxt>
                </Container>
            </FooterBottom>
        </AppFooter>
    )
}
export default Footer;