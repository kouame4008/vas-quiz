import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Circle, LotText, LotSubText, CirclePlus } from '../../../../shared/components/welcome-css';
import Plus from '../../../../public/assets/plus.svg';
import Img_lot_1 from '../../../../public/assets/lots/Img_lot_1.png';
import Img_lot_2 from '../../../../public/assets/lots/Img_lot_2.png';
import Img_lot_3 from '../../../../public/assets/lots/Img_lot_3.png';
import Image from 'next/image';

const lots = [
    {
        title: '1er lot',
        description: 'Omnis iste nauti error<br />sit volupatem',
        image: Img_lot_1
    },
    {
        title: 'Deuxieme lot',
        description: 'Omnis iste nauti error<br />sit volupatem',
        image: Img_lot_2
    },
    {
        title: 'Troixieme lot',
        description: 'Omnis iste nauti error<br />sit volupatem',
        image: Img_lot_3
    }
]

const LotaGagner = () => {

    function createMarkup(textTransform: string) {
        return { __html: textTransform };
    }

    return (
        <React.Fragment>
            <Row className='pt-4'>
                {lots.map((item, i) => (
                    <Col md={3}>
                        <div className='w-100 d-flex justify-content-center align-content-center'>
                            <div>
                                <Image
                                    src={item.image.src}
                                    width={item.image.width}
                                    height={item.image.height}
                                />
                            </div>
                        </div>
                        <LotText>
                            {item.title}
                        </LotText>
                        <LotSubText dangerouslySetInnerHTML={createMarkup(item.description)} />
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