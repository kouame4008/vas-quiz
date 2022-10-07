import * as React from 'react';
import {  Container } from 'react-bootstrap';
import styled from 'styled-components';


const FooterB = styled.div`
    padding : 5px;
    background: rgba(234, 92, 13, 1) 0% 0% no-repeat padding-box;
    color : #FFF;
`;
const SmallTxt = styled.small`
    margin-right: 10px;
    margin-top: 7px;
    border-radius: 10px;
    font-size : 13px;
`;

const FooterBottom = () => {
    return (
        <FooterB>
            <Container>
                <SmallTxt>2022 Copyright - VAS technologies</SmallTxt>
            </Container>
        </FooterB>
    )
}
export default FooterBottom;