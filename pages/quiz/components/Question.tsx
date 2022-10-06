import * as React from 'react';
import styled from 'styled-components';
import { Circle } from '../../../shared/components/welcome-css';

const Section = styled.div`
    border: 1px solid #DEDEDE;
    border-radius: 16px;
    padding : 1.2rem 1rem;
    margin-bottom : 20px;
    cursor : pointer;
    display : flex;
`;
const Question = () => {
    return (
        <React.Fragment>
            <Section>
                <span>Découvrez vos meilleurs scores et votre rang dans le jeu</span>
                <span style={{
                    display : 'flex',
                    justifyContent : 'center',
                    alignItems : 'center'
                }}>
                    <Circle dimension='50px' />
                </span>
            </Section>
        </React.Fragment>
    )
}

export default Question;