import * as React from 'react';
import { CardBody, Circle } from '../../../../shared/components/welcome-css';


const Card = () => {
    return (
        <CardBody>
            <div style={{ flex : 1 }}>
                <h3 style={{ fontSize : '16px', fontWeight : 600}}>Classement</h3>
                 <span>
                    Découvrez votre  <br />
                    meilleure score et <br /> votre rang dans le jeu
                 </span>
                 <div className='mt-1'>
                    <Circle dimension='50px' />
                 </div>
            </div>
            <div style={{ width : '150px' }}>
                <Circle dimension='150px' />
            </div>
        </CardBody>
    )
}

export default Card;