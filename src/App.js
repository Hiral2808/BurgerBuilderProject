import React, { Component } from 'react';
import { Route,Routes } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Checkout from "./containers/Checkout/Checkout";
class App extends Component {
  
  render(){
  return (
    <div>
      <Layout>
        <Routes>
        <Route path="/checkout" element={ <Checkout/> }/>
        <Route path="/" exact element={ <BurgerBuilder/> }/>
        </Routes>
        {/* <BurgerBuilder/> 
        <Checkout/> */}
       </Layout>
    </div>
  );
}
}

export default App;
