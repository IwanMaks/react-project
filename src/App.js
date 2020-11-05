import React from 'react';
import { NavBar } from './Components/NavBar/NavBar';
import { Menu } from './Components/Menu/Menu';
import { GlobalStyle } from './Components/Styled/GlobalStyle';
import { ModalItem } from './Components/Modal/ModalItem';
import { Order } from './Components/Order/Order';
import { useOpenItem } from './Components/Hooks/useOpenItem';
import { useOrder } from './Components/Hooks/useOrders';


function App() {
    const openItem = useOpenItem();
    const orders = useOrder();

    return (
        <>
        <GlobalStyle/>
        <NavBar/>
        <Order {...orders} {...openItem}/>
        <Menu {...openItem}/>
        { openItem.openItem && <ModalItem {...openItem} {...orders}/>}
        </>
    );
}

export default App;
