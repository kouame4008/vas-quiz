import { Button } from "antd";
import styled from 'styled-components';


export const QBdefault = styled(Button)`
    border: 1px solid #EA5C0D;
    color: #EA5C0D;
    border-radius: 8px;
    opacity: 1;
    padding: 12px 24px !important;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    background : transparent;
    transition: all ease-in .3s;
    -o-transition: all ease-in .3s;
    -moz-transition: all ease-in .3s;
    -webkit-transition: all ease-in .3s;
    height : unset !important;

    &:hover {
        border: 1px solid #FFA900;
        color: #FFA900;
        transition: all ease-in .3s;
        -o-transition: all ease-in .3s;
        -moz-transition: all ease-in .3s;
        -webkit-transition: all ease-in .3s;
        background : transparent;
    }
`;

export const QBdefaultPadding = styled(Button)`
    border: 1px solid #EA5C0D;
    color: #EA5C0D;
    border-radius: 8px;
    opacity: 1;
    padding: 9px 24px !important;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    background : transparent;
    transition: all ease-in .3s;
    -o-transition: all ease-in .3s;
    -moz-transition: all ease-in .3s;
    -webkit-transition: all ease-in .3s;
    height : unset !important;

    &:hover {
        border: 1px solid #FFA900;
        color: #FFA900;
        transition: all ease-in .3s;
        -o-transition: all ease-in .3s;
        -moz-transition: all ease-in .3s;
        -webkit-transition: all ease-in .3s;
        background : transparent;
    }
`;

export const QBActive = styled(Button)`
    color: #FFF;
    background : #F27C00;
    border-radius: 8px;
    opacity: 1;
    padding: 9px 24px !important;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    transition: all ease-in .3s;
    -o-transition: all ease-in .3s;
    -moz-transition: all ease-in .3s;
    -webkit-transition: all ease-in .3s;
    height : unset !important;
    border : 0 !important;
    


    &:hover {
        color: #FFF;
        background : #FFA900;
        transition: all ease-in .3s;
        -o-transition: all ease-in .3s;
        -moz-transition: all ease-in .3s;
        -webkit-transition: all ease-in .3s;
        border : 0 !important;
    }
`;