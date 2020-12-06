import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { NavBar } from './Components/NavBar/NavBar';
import { Menu } from './Components/Menu/Menu';
import { GlobalStyle } from './Components/Styled/GlobalStyle';
import { ModalItem } from './Components/Modal/ModalItem';
import { Order } from './Components/Order/Order';
import { useOpenItem } from './Components/Hooks/useOpenItem';
import { useOrder } from './Components/Hooks/useOrders';
import { useAuth } from './Components/Hooks/userAuth';
import { useTitle } from './Components/Hooks/useTitle';
import { useDB } from './Components/Hooks/useDB'; 
import { OrderConfirm } from './Components/Order/OrderConfirm';
import { useOrderConfirm } from './Components/Hooks/useOrderConfirm';
import { Context } from './Components/Functions/context';


const firebaseConfig = {
    apiKey: "AIzaSyBZDXPwF-4X9Ffq5P_HEdkvuccq3LOaV9s",
    authDomain: "mrdonald-8fa42.firebaseapp.com",
    databaseURL: "https://mrdonald-8fa42.firebaseio.com",
    projectId: "mrdonald-8fa42",
    storageBucket: "mrdonald-8fa42.appspot.com",
    messagingSenderId: "898808501402",
    appId: "1:898808501402:web:28552c68de3e457887bb23"
  };

  firebase.initializeApp(firebaseConfig);

function App() {

    const auth = useAuth(firebase.auth);
    const openItem = useOpenItem();
    const orders = useOrder();
    const orderConfirm = useOrderConfirm();
    const database = firebase.database();
    useTitle(openItem.openItem);
    const dbMenu = useDB(database);

    return (
        <Context.Provider value={{
            auth,
            openItem,
            orders,
            orderConfirm,
            database,
            dbMenu
        }}>
        <GlobalStyle />
        <NavBar />
        <Order />
        <Menu />
        { openItem.openItem && <ModalItem />}
        {orderConfirm.openOrderConfirm && <OrderConfirm />}
        </Context.Provider>
    );
}

export default App;
