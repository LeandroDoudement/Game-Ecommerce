import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Payment from './pages/Payment'

function Routes() {
  return (
    <Switch>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/cart' element={<Cart />} />
      <Route exact path='/payment' element={<Payment />} />
    </Switch>
  );
}

export default Routes;
