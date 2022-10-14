import api from "../config/api";
import { AxiosHeaders } from "../../../shared/services/axiosheaders";

// Axios Heders Token

// LISTE CATEGORIES
export const liste_categories = async (url: string) => {
    return api.get(url, AxiosHeaders()).then((res) => res.data)
}