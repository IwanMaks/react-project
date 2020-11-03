import React from 'react';
import styled from 'styled-components';
import { Button } from '../Styled/ModalItemButton';
import { OrderListItem } from './OrderListItem';
import { totalPriceItems } from '../Functions/secondaryFunction';
import { formatCurrency } from '../Functions/secondaryFunction';

const OrderStyled = styled.section`
    position: fixed;
    display: flex;
    flex-direction: column;

    top: 80px;
    left: 0;
    background: #fff;
    min-width: 380px;
    height: calc(100% - 80px);
    box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.25);
    padding: 20px;

`;

const OrderTitle = styled.h2`
    text-align: center;
    margin-bottom: 30px;
`;

const OrderContent = styled.div`
    flex-grow: 1;
`;

const OrderList = styled.ul`

`;

const Total = styled.div`
    display: flex;
    margin: 0 35px 30px;
    & span:first-child {
        flex-grow: 1;
    }
`;

const TotalPrice = styled.span`
    text-align: right;
    min-width: 65px;
    margin-left: 20px;
`;

const Empty = styled.p`
    text-align: center;
`;

export const Order = ({ orders }) => {

    const total = orders.reduce((result, order) => {
        return totalPriceItems(order) + result
    }, 0);

    const totalCounter = orders.reduce((result, order) => {
        return order.count + result
    }, 0);

    return (
        <OrderStyled>
            <OrderTitle>ВАШ ЗАКАЗ</OrderTitle>
            <OrderContent>
                {orders.length ?
                <OrderList>
                    {orders.map(order => <OrderListItem order={order}/>)}
                </OrderList> :
                <Empty>Список заказов пуст</Empty>}
            </OrderContent>
            <Total>
                <span>Итого</span>
                <span>{totalCounter}</span>
                <TotalPrice>{formatCurrency(total)}</TotalPrice>
            </Total>
            <Button>Оформить</Button>
        </OrderStyled>
    )
}