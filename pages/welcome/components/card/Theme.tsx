import * as React from 'react';
import { CardBody, Circle, CardBodyTheme, LotText } from '../css';


const Theme = ({ title }: { title: string }) => {
    return (
        <CardBodyTheme>
            <div className='w-100 d-flex justify-content-center align-content-center'>
                <Circle dimension='151px' />
            </div>
            <LotText className='my-3'>
                {title}
            </LotText>
        </CardBodyTheme>
    )
}

export default Theme;