/* eslint-disable no-debugger */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import Header from '../components/Header';
import states from '../constants/states';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/Payment.css';
import { useNavigate } from 'react-router-dom';
import numberFormatter from '../helpers/numberFormatter';
import { useSession } from '../context/itens.context';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiration, setCardExpiration] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  const navigate = useNavigate();
  const { itens, setItens } = useSession();

  const removeCartItem = (item) => {
    const newItems = itens.filter((element) => element !== item);
    setItens(newItems);
  };

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
    setItens(newItems);
  };

  const cardNumberRegex = /^\d{4}[\s]?\d{4}[\s]?\d{4}[\s]?\d{4}[\s]?\d{0,4}$/;
  const cardSecurityNumberRegex = /^\d{3}$/;
  const cardExpirationRegex =
    /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])$/;

  const checkInformationsValidation = () => {
    const allVerification =
      cardNumberRegex.test(cardNumber) &&
      cardSecurityNumberRegex.test(cardCVC) &&
      cardExpirationRegex.test(cardExpiration);

    return allVerification;
  };

  const displayIncorrectInformations = () => {
    const allVerifications = [
      cardNumberRegex.test(cardNumber),
      cardSecurityNumberRegex.test(cardCVC),
      cardExpirationRegex.test(cardExpiration),
    ];

    const invalidFields = [];
    allVerifications.forEach((verification, index) => {
      if (!verification) {
        switch (index) {
          case 0:
            invalidFields.push('Número do Cartão');
            break;
          case 1:
            invalidFields.push('Data de vencimento do cartão');
            break;
          case 2:
            invalidFields.push('CVC');
            break;
          default:
            break;
        }
      }
    });

    if (invalidFields.length > 0) {
      alert(
        `Os seguintes campos estão incorretos e/ou incompletos: ${invalidFields.join(
          ', '
        )}`
      );
    }
  };

  const validatePayment = () => {
    const validation = checkInformationsValidation();
    if (validation) {
      alert(
        'Parabéns, sua compra foi realizada, retornando a pagina principal'
      );
      localStorage.removeItem('games');
      setItens([]);
      navigate('/');
    } else {
      console.log('entrou');
      displayIncorrectInformations();
    }
  };

  const subTotal = itens.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const frete = itens.length * 10;

  const totalPrice = frete + subTotal;

  return (
    <div className='payment-page'>
      <Header itemQuantity={itens.length} />
      <div className='cart-and-form-wrapper'>
        <div className='cart-box'>
          <span className='cart-title'>Revise seus produtos</span>
          {itens.length === 0 ? (
            <span className='empty-cart'>Seu carrinho está vazio</span>
          ) : (
            itens.map((item, index) => (
              <div className='item-wrapper' key={index}>
                <div className='item'>
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
                  <span>{`R$${numberFormatter(
                    item.price * item.quantity
                  )}`}</span>
                </div>
                <hr />
              </div>
            ))
          )}
          <div className='payment-wrapper'>
            <span>{`Subtotal: R$${numberFormatter(subTotal)}`}</span>
            <span>
              {subTotal > 250
                ? `Frete Gratis!`
                : `Frete: R$${numberFormatter(frete)}`}
            </span>
            <span>{`Preço Total: R$${numberFormatter(totalPrice)}`}</span>
          </div>
        </div>
        <div className='form-wrapper'>
          <span className='informations-title'>Informações do comprador:</span>
          <form action=''>
            <input type='name' placeholder='Nome Completo' />
            <input type='cpf' placeholder='CPF' />
            <input type='email' placeholder='Email' />
            <input type='phone' placeholder='Telefone Celular' />
            <input type='phone' placeholder='Telefone Residencial' />
            <input type='adress' placeholder='Endereço' />
            <input type='text' placeholder='Complemento' />
            <input type='text' placeholder='Número' />
            <input type='Cidade' placeholder='Cidade' />
            <select className='states-select'>
              <option value=''>UF</option>
              {states.map((state) => (
                <option value={state.uf} key={state.uf}>
                  {state.nome}
                </option>
              ))}
            </select>
          </form>
          <span className='informations-title'>Informações de pagamento:</span>
          <form action=''>
            <input
              type='text'
              placeholder='Número do cartão *'
              onChange={({ target: { value } }) => setCardNumber(value)}
              maxLength='19'
            />
            <input
              type='text'
              placeholder='Data de vencimento *'
              onChange={({ target: { value } }) => setCardExpiration(value)}
              maxLength='5'
            />
            <input
              type='tex'
              placeholder='CVC *'
              onChange={({ target: { value } }) => setCardCVC(value)}
              maxLength='3'
            />
          </form>
          <button
            className='payment-button'
            onClick={() => validatePayment()}
            disabled={itens.length === 0}
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
