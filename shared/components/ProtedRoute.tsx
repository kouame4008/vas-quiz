import * as React from 'react';
import { useSelector } from 'react-redux';
import Accueil from '../../pages';
import Cookies from 'js-cookie';

interface ProtectRouteType {
    children: React.ReactElement
}

const ProtectRoute = ({ children }: ProtectRouteType) => {
    const accessToken = useSelector((state: any) => state.user.accessToken);
    // mise a jour du token
    Cookies.set ('accessToken', accessToken);

    if (!accessToken) {
        return <Accueil />;
    }

    return children;
};

export default ProtectRoute;