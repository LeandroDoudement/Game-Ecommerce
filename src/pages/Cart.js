import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import '../styles/Cart.css';
import { useNavigate } from 'react-router-dom';
import numberFormatter from '../helpers/numberFormatter';
import { useSession } from '../context/itens.context';

const Cart = () => {
  const navigate = useNavigate();
  const {itens, setItens} = useSession()

  const updateQuantity = (index, operation) => {
      const newItems = [...itens];
      if (newItems[index].quantity === 1 && operation === '-') {
        newItems[index].quantity = 1;
      } else {
        newItems[index].quantity =
          operation === '+'
            ? newItems[index].quantity + 1
            : newItems[index].quantity - 1;
      }
      setItens(newItems)
  };

  const removeCartItem = (item) => {
    const newItems = itens.filter((element) => element !== item);
    setItens(newItems);
  };

  const subTotal = itens.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const frete = itens.length * 10;

  const totalPrice = frete + subTotal;


  return (
    <div className='cart-page-wrapper'>
      <Header itemQuantity={itens.length}/>
      <div className='cart-page'>
        <div className='cart-and-payment-wrapper'>
          <div className='cart-box'>
            <span className='cart-title'>Carrinho de compras</span>
            {itens.length === 0 ? (
              <span className='empty-cart'>Seu carrinho está vazio</span>
            ) : (
              itens.map((item, index) => (
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
                    <span>{`R$${numberFormatter((item.price * item.quantity))}`}</span>
                  </div>
                  <hr />
                </div>
              ))
            )}
          </div>
          <div className='total-price-box'>
            <span data-testid='subtotal'>{`Subtotal: R$${numberFormatter(subTotal)}`}</span>
            <span data-testid='frete'>
              {subTotal > 250 ? `Frete Gratis!` : `Frete: R$${numberFormatter(frete)}`}
            </span>
            <span data-testid='total'>{`Preço Total: R$${numberFormatter(totalPrice)}`}</span>
            <button
              className='payment-button'
              onClick={() => navigate('/payment')}
              disabled={itens.length === 0}
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
