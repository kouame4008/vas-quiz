import { Space } from "antd";
import { useRouter } from "next/router";
import { CardBody, Circle } from "../../../pages/welcome/components/css";
import { QBActive, QBdefaultPadding } from "../header/css/Buttons";
import { IModalChoisirFormule } from "../interface/Interface";
import QuizModal from "./QuizModal"


export const ModalChoisirOptions = ({
    visible,
    close,
    handleOk,
}: IModalChoisirFormule) => {


    return (
        <QuizModal
            visible={visible}
            close={close}
        >
            <CardBody style={{ background: 'transparent' }}>
                <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 600 }}>Formule Normale</h3>
                    <span>
                        Pour cette formule vous serez prélevez d’un montant
                        de 103 FCFA. Vous donnant droit à un pack de 03  question.
                    </span>
                    <div className='mt-2'>
                        <Space>
                            <QBActive
                                onClick={handleOk}
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