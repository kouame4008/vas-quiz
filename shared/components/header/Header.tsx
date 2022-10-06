import * as React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Logo, UserInfoContent } from '../welcome-css';
import { Space, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const pathname = ['/', '/verifier-otp','/choisir-theme','/quiz'];

const Header = () => {
    const router = useRouter()

    return (
        <React.Fragment>
            <Container>
                <Navbar.Brand href="#home">
                    <Logo color={pathname.includes (router.asPath) ? 'grey' : 'FFF'} />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Space>
                        <UserInfoContent>
                            <small>Bonjour.</small>
                            <span>07 77 95 23 56</span>
                        </UserInfoContent>
                        <div>
                            <Avatar size="large" icon={<UserOutlined />} />
                        </div>
                    </Space>
                </Navbar.Collapse>
            </Container>
        </React.Fragment>
    )
}

export default Header;