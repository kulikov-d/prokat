import React from "react";
import Header from './components/header/header';
import Promo from './components/promo/promo';
import Route from "./components/route/route";
import Motorcycles from "./components/motorcycles/motorcycles"
import PricesAndInfo from "./components/pricesAndInfo/pricesAndInfo";
import ContactsAndMaps from './components/contactsAndMaps/contactsAndMaps'
function App() {    
    return (
        <>
            <Header />
            <Promo />
            <Motorcycles /> 
            <Route />
            <PricesAndInfo/>
            <ContactsAndMaps /> 
        </>
    );
}

export default App;