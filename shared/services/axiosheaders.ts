import Cookies from 'js-cookie';

export const AxiosHeaders = () => {
    const headers = {
        headers: {
            'Authorization': `Bearer ${Cookies.get('accessToken')}`
        }
    }
    return headers;
}