import { Modal, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { IModalChoisirFormule } from "../../../pages/api/config/interface/Interface";




const {Title} = Typography;

const ModalQuiz = styled(Modal)`
    background : rgba(153, 210, 227, 1);
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
    width,
    style
}: IModalChoisirFormule) => {
    return (
        <ModalQuiz
            centered
            open={visible}
            onCancel={close}
            footer={false}
            maskClosable={false}
            width= {typeof width !== 'undefined' ? width : '520px'}
            style={style}
        >
            {children}
        </ModalQuiz>
    )
}

export default QuizModal;