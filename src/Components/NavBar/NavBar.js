import React, { useContext } from 'react';
import styled from 'styled-components';
import logoImg from '../../images/logo.svg';
import signImg from '../../images/sign.svg';
import { Context } from '../Functions/context';

const NavBarStyled = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: #299B01;
    color: white;
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
`;

const H1 = styled.h1`
    font-size: 24px;
    margin-left: 15px;
`;

const Imglogo = styled.img`
    width: 50px;
`;

const Login = styled.button`
    background-color: transparent;
    border: none;
    font-size: 16px;
    line-height: 19px;
    color: white;
    margin-right: 31px;
    cursor: pointer;
    outline: none;
`;

const User = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
`;

const LogOut = styled.span`
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    margin-right: 30px;
`;

const Figure = styled.figure`
    margin: 0 30px;
`;

export const NavBar = () => {
    const {auth: { authf, login, logOut } } = useContext(Context);
    return (
        <NavBarStyled>
            <Logo>
                <Imglogo src={logoImg} alt='logo' />
                <H1>MrDonald's</H1>
            </Logo>
            {authf ? 
                <User>
                    <Figure>
                        <img src={signImg} alt={authf.displayName} />
                        <figcaption>{authf.displayName}</figcaption>
                    </Figure>
                    <LogOut title='Выйти' onClick={logOut}>X</LogOut>
                </User>:
                <Login onClick={login}>
                    <Figure>
                        <img src={signImg} />
                        <figcaption>Войти</figcaption>
                    </Figure>
                </Login>}
        </NavBarStyled>
    )
};
