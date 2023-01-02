import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header'
import '../styles/Cart.css'

const Cart = () => {
    const [cartItems, setCartItems ] = useState([])
    useEffect(() => {
         setCartItems(JSON.parse(localStorage.getItem('games')))
    }, []);

    const updateQuantity = (index, operation) => {
        setCartItems(prevItems => {
          const newItems = [...prevItems]
          if(newItems[index].quantity === 0 && operation === '-'){
            newItems[index].quantity = 0
          }
          else{
          newItems[index].quantity = operation === '+' ? newItems[index].quantity + 1 : newItems[index].quantity - 1
          }
          return newItems
        })
      }
      

      const removeCartItem = (item) => {
        const newItems = cartItems.filter((element) => element !== item)
        localStorage.setItem('games', JSON.stringify(newItems))
        setCartItems(newItems)
      }

      const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

    return(
        <div>
            <Header />
            <div className='cart-page'>
            <div className='cart-box'>
                <span className='carrinho-title'>Carrinho de compras</span>
                <hr />
                {cartItems.map((item, index) => (
                    <div className='item' key={index}>
                        <FontAwesomeIcon icon={faX} onClick={() => removeCartItem(item)} />
                        <img src={require(`../images/${item.image}`)} alt={item.name} width='90px' />
                        <span className='item-name'>{item.name}</span>
                        <FontAwesomeIcon icon={faMinus} onClick={() => updateQuantity(index, '-')} />
                        <span className='item-quantity'>{item.quantity}</span>
                        <FontAwesomeIcon icon={faPlus} onClick={() => updateQuantity(index, '+')} />
                        <span>{`R$${(item.price * item.quantity).toFixed(2)}`}</span>
                        <hr />
                    </div>
                ))}
            </div>
            <div className='total-price-box'>
                <span>{`${cartItems.length} items: R$${totalPrice.toFixed(2)}`}</span>
                <span>{totalPrice > 250 ? `Frete Gratis!` : `Frete: ${(cartItems.length * 10).toFixed(2)}`}</span>
            </div>
            </div>
        </div>
    )
}

export default Cart;