import { Button } from 'antd';
import Image from 'next/image';
import * as React from 'react';
import styled from 'styled-components';
import { CardBody, Circle } from '../../../../shared/components/welcome-css';


const ButtonPlus = styled(Button)`
    background: #EA5C0D 0% 0% no-repeat padding-box;
    border-radius: 8px;
    color : #FFF;
    border : 0;
`;

interface ICard {
    title: string;
    description: string;
    handlePlus: Function;
    image?: any,
    color: string;
}

const Card = ({
    title,
    description,
    handlePlus,
    image,
    color
}: ICard) => {
    return (
        <CardBody color={color}>
            <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}> {title} </h3>
                <span>
                    {/* Découvrez votre  <br />
                    meilleure score et <br /> votre rang dans le jeu */}
                    {description}
                </span>
                <div className='mt-3'>
                    <ButtonPlus onClick={() => handlePlus}>+</ButtonPlus>
                </div>
            </div>
            <div style={{ width: '150px',height : '150px' }}>
                {typeof image === 'undefined' ?
                    <Circle dimension='150px' />
                    :
                    <Image
                        src={image.src}
                        width={image.width}
                        height={image.height}
                    />
                }
            </div>
        </CardBody>
    )
}

export default Card;