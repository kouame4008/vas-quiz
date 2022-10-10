import { Modal, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { IModalChoisirFormule } from "../interface/Interface";




const {Title} = Typography;

const ModalQuiz = styled(Modal)`
    background : #F0F0F0;
    border-radius: 28px;

    .ant-modal-header {
        background : transparent !important;
    }

    .ant-modal-content {
        background : transparent !important;
        box-shadow : unset !important;

        .ant-modal-body {
            //padding: 30px 24px;
        }
    }
`;

const QuizModal = ({
    children,
    visible,
    close,
}: IModalChoisirFormule) => {
    return (
        <ModalQuiz
            centered
            open={visible}
            onCancel={close}
            footer={false}
            maskClosable={false}
        >
            {children}
        </ModalQuiz>
    )
}

export default QuizModal;