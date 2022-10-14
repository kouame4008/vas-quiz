import Axios from "axios";
import Cookies from 'js-cookie';

let urls = {
    test: `http://localhost:3000`,
    development: `${process.env.NEXT_PUBLIC_BASE_DEV_URL}`,
    production: `${process.env.NEXT_PUBLIC_BASE_PROD_URL}`
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${Cookies.get ('accessToken')}`
    }
});

export default api;