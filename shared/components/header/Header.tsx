import * as React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Logo, UserInfoContent } from '../welcome-css';
import { Space, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import AvatarSrc from '../../../public/btn_deconnexion.png';
import Image, { StaticImageData } from 'next/image';
import { AnyARecord } from 'dns';

const pathname = ['/', '/verifier-otp', '/choisir-theme', '/quiz'];

const Header = ({ logo }: { logo: StaticImageData }) => {
    const router = useRouter()

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
                            <span className='text-white'>07 77 95 23 56</span>
                        </UserInfoContent>
                        <div>
                            <Avatar size="large" src={AvatarSrc.src} style={{ cursor: 'pointer' }} />
                        </div>
                    </Space>
                </Navbar.Collapse>
            </Container>
        </React.Fragment>
    )
}

export default Header;