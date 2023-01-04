/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import '../styles/Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('games')) {
      localStorage.setItem('games', JSON.stringify([]));
    }
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
      localStorage.setItem('games', JSON.stringify(newItems));
      return newItems;
    });
  };

  const removeCartItem = (item) => {
    const newItems = cartItems.filter((element) => element !== item);
    localStorage.setItem('games', JSON.stringify(newItems));
    setCartItems(newItems);
  };

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const frete = subTotal > 250 ? 0 : (cartItems.length * 10).toFixed(2);

  const totalPrice = Number(subTotal) + Number(frete);

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
                <div className='item-wrapper' key={index}>
                  <div className='item' data-testid='item'>
                    <FontAwesomeIcon
                      icon={faX}
                      className='delete-product'
                      onClick={() => removeCartItem(item)}
                      data-testid='delete-product'
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
                      data-testid='raise-quantity-button'
                    />
                    <span className='item-quantity' data-testid='item-quantity'>
                      {item.quantity}
                    </span>
                    <FontAwesomeIcon
                      icon={faPlus}
                      onClick={() => updateQuantity(index, '+')}
                      data-testid='subtract-quantity-button'
                    />
                    <span>{`R$${(item.price * item.quantity).toFixed(
                      2
                    )}`}</span>
                  </div>
                  <hr />
                </div>
              ))
            )}
          </div>
          <div className='total-price-box'>
            <span data-testid='subtotal'>{`Subtotal: ${subTotal.toFixed(
              2
            )}`}</span>
            <span data-testid='frete'>
              {frete === 0 ? `Frete Gratis!` : `Frete: ${frete}`}
            </span>
            <span data-testid='total'>{`${
              cartItems.length
            } items: R$${totalPrice.toFixed(2)}`}</span>
            <button
              className='payment-button'
              onClick={() => navigate('/payment')}
              disabled={cartItems.length === 0}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
