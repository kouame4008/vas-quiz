import Image from 'next/image';
import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Circle, LotText, LotSubText, CirclePlus } from '../../../../shared/components/welcome-css';
import Plus from '../../../../public/assets/plus.svg';

const length = 3;
const lot = ['1er lot', 'Deuxieme lot', 'Troixieme lot']

const LotaGagner = () => {

    return (
        <React.Fragment>
            <Row className='pt-4'>
                {Array.from({ length }, (v, k) => k).map((k, i) => (
                    <Col md={3}>
                        <div className='w-100 d-flex justify-content-center align-content-center'>
                            <Circle dimension='151px' />
                        </div>
                        <LotText>
                            {lot[i]}
                        </LotText>
                        <LotSubText>
                            Omnis iste nauti error<br />
                            sit volupatem
                        </LotSubText>
                    </Col>
                ))}
                <Col md={3}>
                    <div className='w-100 d-flex justify-content-center align-content-center'>
                        <CirclePlus dimension='151px'>
                            <Image
                                src={Plus.src}
                                width={50}
                                height={50}
                            />
                        </CirclePlus>
                    </div>
                    <LotText>
                        Et bien plus <br /> encore
                    </LotText>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default LotaGagner;