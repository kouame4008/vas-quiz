import { StaticImageData } from "next/image";
import React from "react";

export interface IModalChoisirFormule {
    children?: React.ReactNode,
    visible: boolean,
    close: any,
    handleOk?: any,
    title?: string;
    currentItem?: any;
    loading?: boolean;
    width?: string;
    style ?: React.CSSProperties
}

export interface IModalChoisirOptions {
    children?: React.ReactNode,
    visible: boolean,
    close: any,
    handleOk?: any,
    title?: string;
    currentItem?: any;
    loading?: boolean;
    width?: string;
}

export interface ITheme {
    id?: number;
    nom: string;
    icon: StaticImageData;
}

export interface Idigit {
    digit_1: string;
    digit_2: string;
    digit_3: string;
    digit_4: string;
}

export interface IPack {
    id: number;
    type_pack: string;
    montant?: string;
    nombre_question?: number;
    point_bonne_reponse?: number;
    point_reponse_incorrecte?: number;
}

export interface ISouscription {
    pack_id: string;
    category_id: string;
}