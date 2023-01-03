/* eslint-disable no-undef */
import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import '../styles/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem('games')));
  }, []);

  const updateQuantity = (index, operation) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      if (newItems[index].quantity === 1 && operation === '-') {
        newItems[index].quantity = 1;
      } else {
        newItems[index].quantity =
          operation === '+'
            ? newItems[index].quantity + 1
            : newItems[index].quantity - 1;
      }
      return newItems;
    });
  };

  const removeCartItem = (item) => {
    const newItems = cartItems.filter((element) => element !== item);
    localStorage.setItem('games', JSON.stringify(newItems));
    setCartItems(newItems);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className='cart-page-wrapper'>
      <Header />
      <div className='cart-page'>
        <div className='cart-and-payment-wrapper'>
        <div className='cart-box'>
          <span className='cart-title'>Carrinho de compras</span>
          {cartItems.length === 0 ? (
            <span className='empty-cart'>Seu carrinho está vazio</span>
          ) : (
            cartItems.map((item, index) => (
              <div className='item-wrapper'>
                <div className='item' key={index}>
                  <FontAwesomeIcon
                    icon={faX}
                    className='delete-product'
                    onClick={() => removeCartItem(item)}
                  />
                  <img
                    src={require(`../images/${item.image}`)}
                    alt={item.name}
                    className='item-img'
                  />
                  <span className='item-name'>{item.name}</span>
                  <FontAwesomeIcon
                    icon={faMinus}
                    onClick={() => updateQuantity(index, '-')}
                  />
                  <span className='item-quantity'>{item.quantity}</span>
                  <FontAwesomeIcon
                    icon={faPlus}
                    onClick={() => updateQuantity(index, '+')}
                  />
                  <span>{`R$${(item.price * item.quantity).toFixed(2)}`}</span>
                </div>
                <hr />
              </div>
            ))
          )}
        </div>
        <div className='total-price-box'>
          <span>{`${cartItems.length} items: R$${totalPrice.toFixed(2)}`}</span>
          <span>
            {totalPrice > 250
              ? `Frete Gratis!`
              : `Frete: ${(cartItems.length * 10).toFixed(2)}`}
          </span>
          <button className='payment-button'>Finalizar compra</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
