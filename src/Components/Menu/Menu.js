import React, { useContext } from 'react';
import styled from 'styled-components';
import { ListItem } from './ListItem';
import { Context } from '../Functions/context';

const MenuStyled = styled.main`
    background-color: #ccc;
    margin-top: 80px;
    margin-left: 380px;
`;

const SectionMenu = styled.section`
    padding: 30px;
`;

const Banner = styled.div`
    width: 100%;
    height: 210px;
    background-image: ${({ img }) => `url(${img})`};
    background-repeat: no-repeat;
    background-size: cover;
`;

export const Menu = () => {
    
    const {
        dbMenu
    } = useContext(Context);

    return (
        <MenuStyled>
            <Banner img={'/banner.png'}/>
            { dbMenu ? 
            <>
                <SectionMenu>
                    <h2>Бургеры</h2>
                    <ListItem 
                        itemList={dbMenu.burger}/>
                </SectionMenu>
                <SectionMenu>
                    <h2>Закуски и напитки</h2>
                    <ListItem 
                        itemList={dbMenu.other}/>
                </SectionMenu>
            </> :
            <div>Loading...</div>
            }
        </MenuStyled>
    )
};