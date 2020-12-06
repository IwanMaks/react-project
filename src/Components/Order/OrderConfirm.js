import React, { useContext } from 'react';
import styled from 'styled-components';
import { Overlay } from '../Modal/ModalItem';
import { OrderTitle, Total, TotalPrice } from './Order';
import { Button } from '../Styled/ModalItemButton';
import { projection } from '../Functions/secondaryFunction';
import { totalPriceItems } from '../Functions/secondaryFunction';
import { formatCurrency } from '../Functions/secondaryFunction';
import { Context } from '../Functions/context';

const Modal = styled.div`
    background-color: white;
    width: 600px;
    padding: 30px;
`;

const Text = styled.h3`
    text-align: center;
    margin-bottom: 30px;
`;

const rulesData = {
    name: ['name'],
    price: ['price'],
    count: ['count'],
    topping: ['topping', arr => arr.filter(obj => obj.checked).map(obj => obj.name),
        arr => arr.length ? arr : 'no topping'],
    choice: ['choice', item => item ? item : 'no choices']
}

const sendOrder = (database, orders, auth) => {
    const newOrder = orders.map(projection(rulesData));
    database.ref('orders').push().set({
        nameClient: auth.displayName,
        email: auth.email,
        order: newOrder
    });
}

export const OrderConfirm = () => {

    const {
        orders: { orders, setOrders },
        auth: { auth },
        orderConfirm: { setOpenOrderConfirm },
        database
    } = useContext(Context);

    const total = orders.reduce((result, order) => {
        return totalPriceItems(order) + result
    }, 0);

    return(
        <Overlay>
            <Modal>
                <OrderTitle>{auth.displayName}</OrderTitle>
                <Text>Осталось только подтвердить заказ</Text>
                <Total>
                    <span>Итого: </span>
                    <TotalPrice>{formatCurrency(total)}</TotalPrice>
                </Total>
                <Button
                    onClick={() => {
                        sendOrder(database, orders, auth);
                        setOrders([]);
                        setOpenOrderConfirm(false);
                    }}
                >
                    Подтвердить
                </Button>
            </Modal>
        </Overlay>
    )
}