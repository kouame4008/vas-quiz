import { ENREGISTRER_SCORE_URL, ENVOI_DE_LA_REPONSE_URL, LISTE_QUESTION_PAR_SOUSCRIPTION_URL } from './../config/ApiRouter';
import { AxiosHeaders } from "../../../shared/services/axiosheaders";
import api from "../config/api";
import { SOUSCRIPTION_URL } from "../config/ApiRouter";
import { ISouscription } from "../config/interface/Interface";

// Axios Heders Token;

// LISTE PACKS
export const liste_packs = async (url: string) => {
    return api.get(url, AxiosHeaders()).then((res) => res.data)
}

// LISTE PACKS
export const liste_questions = async (souscription_id: string) => {
    return api.get(`${LISTE_QUESTION_PAR_SOUSCRIPTION_URL}/${souscription_id}/questions`, AxiosHeaders()).then((res) => res.data);
}

// SOUSCRIPTION
export const souscription_pack = async (data: ISouscription) => {
    return api.post(SOUSCRIPTION_URL, data, AxiosHeaders()).then((res) => res.data)
        .catch((err: any) => {
            return { status: err?.response?.data?.status, message: err?.response?.data?.message }
        });
}

// ENREGISTREMENT DU SCORE
export const enregistrer_score = async (data: any) => {
    return api.post(ENREGISTRER_SCORE_URL, data, AxiosHeaders()).then((res) => res.data)
        .catch((err: any) => {
            return { status: err?.response?.data?.status, message: err?.response?.data?.message }
        });
}

// SEND REPONSE 
export const envoi_de_la_reponse = async (data: any) => {
    return api.post(ENVOI_DE_LA_REPONSE_URL, data, AxiosHeaders()).then((res) => res.data)
        .catch((err: any) => {
            return { status: err?.response?.data?.status, message: err?.response?.data?.message }
        });
}