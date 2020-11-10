import React from 'react';
import styled from 'styled-components';
import dbMenu from '../DBMenu';
import { ListItem } from './ListItem';
import { useFetch } from '../Hooks/useFetch';

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

export const Menu = ({ setOpenItem }) => {
    const res = useFetch();
    const dbMenu = res.response;

    return (
        <MenuStyled>
            <Banner img={'/banner.png'}/>
            { dbMenu ? 
            <>
                <SectionMenu>
                    <h2>Бургеры</h2>
                    <ListItem 
                        itemList={dbMenu.burger} 
                        setOpenItem={setOpenItem}/>
                </SectionMenu>
                <SectionMenu>
                    <h2>Закуски и напитки</h2>
                    <ListItem 
                        itemList={dbMenu.other}
                        setOpenItem={setOpenItem}/>
                </SectionMenu>
            </> : res.error ? 
            <div>Sorry, we will fix it soon...</div>
            :
            <div>Loading...</div>
            }
        </MenuStyled>
    )
};