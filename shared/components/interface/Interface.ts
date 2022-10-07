import React from "react";

export interface IModalChoisirFormule {
    children ?: React.ReactNode,
    visible: boolean,
    close: any,
    handleOk ?: any,
    title?: string;
    currentItem ?: any;
    loading ?: boolean;
}