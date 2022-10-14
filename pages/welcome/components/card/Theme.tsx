import Image from 'next/image';
import * as React from 'react';
import { ITheme } from '../../../api/config/interface/Interface';
import { CardBody, Circle, CardBodyTheme, LotText } from '../../../../shared/components/welcome-css';


const Theme = ({ nom, icon }: ITheme) => {
    return (
        <CardBodyTheme>
            <div className='w-100 d-flex justify-content-center align-content-center'>
                <Image
                  src={icon.src}
                  width={icon.width}
                  height={icon.height}
                />
            </div>
            <LotText className='my-3'>
                {nom}
            </LotText>
        </CardBodyTheme>
    )
}

export default Theme;