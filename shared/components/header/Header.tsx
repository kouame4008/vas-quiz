import * as React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { UserInfoContent } from '../welcome-css';
import { Space, Avatar, notification, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import AvatarSrc from '../../../public/assets/btn_deconnexion.png';
import Deconnexion from '../../../public/btn_deconnexion.png';
import Image, { StaticImageData } from 'next/image';
import { logout } from '../../../pages/api/user/user-actions';
import { useSelector } from 'react-redux';
import { formatterNumber } from '../../helpers/serviceHelpers';
import { useDispatch } from 'react-redux';
import { setLogOut } from '../../../features/user.slice';

const Header = ({ logo, type }: { logo: StaticImageData; type: string }) => {
    const router = useRouter();
    const user = useSelector((state: any) => state.user.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        notification.success({
            message: 'Utilisateur deconnecté !',
            placement: 'bottomRight',
        })
        dispatch(setLogOut())
        logout() && router.push('/')
    }

    return (
        <React.Fragment>
            <Container>
                <Navbar.Brand href="#home">
                    <div>
                        <Image
                            src={logo.src}
                            width={logo.width}
                            height={logo.height}
                        />
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Space>
                        <UserInfoContent>
                            <small className={type === 'blue' ? 'text-white' : 'rgb(0, 78, 156)'}>Bonjour.</small>
                            <span className={type === 'blue' ? 'text-white' : 'rgb(0, 78, 156)'}> {user && formatterNumber(user.user_phone)} </span>
                        </UserInfoContent>
                        <div>
                            <Tooltip title='Se deconnecté'>
                                <Avatar size="large" src={type === 'blue' ? Deconnexion.src : AvatarSrc.src} style={{ cursor: 'pointer' }} onClick={handleLogout} />
                            </Tooltip>
                        </div>
                    </Space>
                </Navbar.Collapse>
            </Container>
        </React.Fragment>
    )
}

export default Header;