import { LOGIN_USER_URL, LOGIN_USER_CHECK_OTP_URL } from './../config/ApiRouter';
import api from "../config/api";
import Cookies from 'js-cookie';
import axios from 'axios';


// LOGIN USER
export const login_user_by_phone_number = async (data: { phone_number: string }) => {
    return api.post(LOGIN_USER_URL, data).then((res) => res.data);
}

// CHECK OTP
export const login_user_check_otp = async (data: { otp: string; phone_number: string | null }) => {
    return api.post(LOGIN_USER_CHECK_OTP_URL, data).then((res) => {
        if (res.data.status === 'succes') {
            Cookies.set('accessToken', res.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        }

        return res.data
    }).catch(() => {
        return { status: 'Error', message: "Network error" }
    })
}

export const logout = () => {
    localStorage.clear();
    Cookies.remove('accessToken');

    return true;
}