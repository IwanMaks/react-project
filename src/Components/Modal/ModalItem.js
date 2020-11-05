import React from 'react';
import styled from 'styled-components';
import { Button } from '../Styled/ModalItemButton';
import { CountItem } from './CountItem';
import { useCount } from '../Hooks/useCount';
import { totalPriceItems } from '../Functions/secondaryFunction';
import { formatCurrency } from '../Functions/secondaryFunction';
import { Toppings } from './Toppings';
import { Choice } from './Choice';
import { useToppings } from '../Hooks/useToppings';
import { useChoices } from '../Hooks/useChoices';

const Overlay = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 20;
`;

const Modal = styled.div`
    position: relative;
    background-color: #fff;
    width: 500px;
    height: 500px;
`;

const Banner = styled.div`
    width: 100%;
    height: 200px;
    background-image: url(${({img}) => img});
    background-size: cover;
    background-position: center;
`;

const Content = styled.section`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: calc(100% - 200px);
`;

const ItemTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    line-height: 53px;
    font-family: Pacifico;
`;

const TotalPriceItem = styled.div`
    display: flex;
    justify-content: space-between;
`;


export const ModalItem = ({ openItem, setOpenItem, orders, setOrders }) => {
    const counter = useCount();
    const toppings = useToppings(openItem);
    const choices = useChoices(openItem);
    const isEdit = openItem.index > -1;
    
    const closeModal = e => {
        if (e.target.id === 'overlay') {
            setOpenItem(null);
        }
    }

    const order = {
        ...openItem,
        count: counter.count,
        topping: toppings.toppings,
        choice: choices.choice
    };

    const editOrder = () => {
        const newOrders = [...orders];
        newOrders[openItem.index] = order;
        setOrders(newOrders);
    }

    const addToOrder = () => {
        setOrders([...orders, order]);
        setOpenItem(null);
    }
    
    return (
        <Overlay id="overlay" onClick={closeModal}>
            <Modal>
                <Banner img={openItem.img}/>
                <Content>
                    <ItemTitle>
                        <p>{openItem.name}</p>
                        <p>{formatCurrency(openItem.price)}</p>
                    </ItemTitle>
                    <CountItem {...counter}/>
                    {openItem.toppings && <Toppings {...toppings}/>}
                    {openItem.choices && <Choice {...choices} openItem={openItem}/>} 
                    <TotalPriceItem>
                        <span>Цена: </span>
                        <span>{formatCurrency(totalPriceItems(order))}</span>
                    </TotalPriceItem>
                    <Button 
                        onClick={isEdit ? editOrder : addToOrder}
                        disabled={order.choices && !order.choice}
                        >
                            Добавить
                    </Button>
                </Content>
            </Modal>
        </Overlay>
    )
};