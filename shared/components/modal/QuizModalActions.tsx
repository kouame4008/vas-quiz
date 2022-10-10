import { Space } from "antd";
import { useRouter } from "next/router";
import { CardBody, Circle } from "../welcome-css";
import { QBActive, QBdefaultPadding } from "../header/css/Buttons";
import { IModalChoisirFormule } from "../interface/Interface";
import QuizModal from "./QuizModal"


export const ModalChoisirOptions = ({
    visible,
    close,
    handleOk,
    currentItem,
    loading
}: IModalChoisirFormule) => {


    return (
        <QuizModal
            visible={visible}
            close={close}
        >
            <CardBody color="transparent">
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 600 }}> {currentItem && currentItem.title} </h3>
                    <span>
                        {currentItem && currentItem.formule}
                    </span>
                    <div className='mt-2'>
                        <Space>
                            <QBActive
                                onClick={() => handleOk()}
                                loading={loading && loading}
                                disabled={loading && loading}
                            >
                                VALIDER
                            </QBActive>

                            <QBdefaultPadding
                                onClick={close}
                            >
                                ANNULER
                            </QBdefaultPadding>
                        </Space>
                    </div>
                </div>
                <div style={{ width: '150px' }}>
                    <Circle dimension='150px' />
                </div>
            </CardBody>
        </QuizModal>
    );
}

export const ModalExpiredTimer = ({
    visible,
    close,
    handleOk,
    loading,
}: IModalChoisirFormule) => {


    return (
        <QuizModal
            visible={visible}
            close={close}
        >
            <CardBody color="transparent">
                <div style={{ width: '150px' }}>
                    <Circle dimension='150px' />
                </div>
                <div style={{ flex: 1, padding: '1rem' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 600 }}> Votre temps est ecoulé </h3>
                    <span>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    </span>
                    <div className='mt-2'>
                        <Space>
                            <QBActive
                                onClick={() => handleOk()}
                                loading={loading && loading}
                                disabled={loading && loading}
                            >
                                CONTINUER
                            </QBActive>

                            <QBdefaultPadding
                                onClick={close}
                            >
                                ANNULER
                            </QBdefaultPadding>
                        </Space>
                    </div>
                </div>
            </CardBody>
        </QuizModal>
    );
}