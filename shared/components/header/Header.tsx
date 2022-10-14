import * as React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { UserInfoContent } from '../welcome-css';
import { Space, Avatar, notification, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import AvatarSrc from '../../../public/assets/btn_deconnexion.png';
import Image, { StaticImageData } from 'next/image';
import { logout } from '../../../pages/api/user/user-actions';
import { useSelector } from 'react-redux';
import { formatterNumber } from '../../helpers/serviceHelpers';

const Header = ({ logo }: { logo: StaticImageData }) => {
    const router = useRouter();
    const user = useSelector((state: any) => state.user.user);

    const handleLogout = () => {
        notification.success({
            message: 'Utilisateur deconnecté !',
            placement: 'bottomRight',
        })
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
                            <small className='text-white'>Bonjour.</small>
                            <span className='text-white'> {user && formatterNumber(user.user_phone)} </span>
                        </UserInfoContent>
                        <div>
                            <Tooltip title='Se deconnecté'>
                                <Avatar size="large" src={AvatarSrc.src} style={{ cursor: 'pointer' }} onClick={handleLogout} />
                            </Tooltip>
                        </div>
                    </Space>
                </Navbar.Collapse>
            </Container>
        </React.Fragment>
    )
}

export default Header;