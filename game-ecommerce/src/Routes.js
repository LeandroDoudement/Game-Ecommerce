import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';

function Routes() {
  return (
    <Switch>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/cart' element={<Cart />} />
    </Switch>
  );
}

export default Routes;
