import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import states from '../states';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/Payment.css';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState('');
  const [CPF, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [residentialPhone, setResidentialPhone] = useState('');
  const [adress, setAdress] = useState('');
  const [adressComplement, setAdressComplement] = useState('');
  const [adressNumber, setAdressNumber] = useState('');
  const [adressState, setAdressState] = useState('');
  const [adressCity, setAdressCity] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiration, setCardExpiration] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('games')) {
      localStorage.setItem('games', JSON.stringify([]));
    }
    setCartItems(JSON.parse(localStorage.getItem('games')));
  }, []);

  const removeCartItem = (item) => {
    const newItems = cartItems.filter((element) => element !== item);
    localStorage.setItem('games', JSON.stringify(newItems));
    setCartItems(newItems);
  };

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

  const nameRegex = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/;
  const CPFRegex =
    /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const cardNumberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
  const cardSecurityNumberRegex = /^\d{3}$/;
  const cardExpirationRegex =
    /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])$/;
  const adressVerification = adress.length > 5;
  const cityVerification = adressCity.length > 3;
  const stateVerification = adressState !== '';

  const checkInformationsValidation = () => {
    const allVerification =
      nameRegex.test(username) &&
      CPFRegex.test(CPF) &&
      emailRegex.test(email) &&
      cardNumberRegex.test(cardNumber) &&
      cardSecurityNumberRegex.test(cardCVC) &&
      cardExpirationRegex.test(cardExpiration) &&
      adressVerification &&
      cityVerification &&
      stateVerification;

    return allVerification;
  };

  const displayIncorrectInformations = () => {
    const allVerifications = [
      nameRegex.test(username),
      CPFRegex.test(CPF),
      emailRegex.test(email),
      cardNumberRegex.test(cardNumber),
      cardSecurityNumberRegex.test(cardCVC),
      cardExpirationRegex.test(cardExpiration),
      adressVerification,
      cityVerification,
      stateVerification,
    ];

    const invalidFields = [];
    allVerifications.forEach((verification, index) => {
      if (!verification) {
        switch (index) {
          case 0:
            invalidFields.push('Nome Completo');
            break;
          case 1:
            invalidFields.push('CPF');
            break;
          case 2:
            invalidFields.push('Email');
            break;
          case 3:
            invalidFields.push('Número do Cartão');
            break;
          case 4:
            invalidFields.push('Data de vencimento do cartão');
            break;
          case 5:
            invalidFields.push('CVC');
            break;
          case 6:
            invalidFields.push('Endereço');
            break;
          case 7:
            invalidFields.push('Cidade');
            break;
          case 8:
            invalidFields.push('Estado');
            break;
          default:
            break;
        }
      }
    });

    if (invalidFields.length > 0) {
      alert(
        `Os seguintes campos estão incorretos: ${invalidFields.join(', ')}`
      );
    }
  };

  const validatePayment = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio, retornando a pagina principal');
      navigate('/');
    }
    if (checkInformationsValidation()) {
      alert(
        'Parabéns, sua compra foi realizada, retornando a pagina principal'
      );
      navigate('/');
      localStorage.removeItem('games');
    } else {
      displayIncorrectInformations();
    }
  };

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const frete = subTotal > 250 ? 0 : (cartItems.length * 10).toFixed(2);

  const totalPrice = Number(subTotal) + Number(frete);

  return (
    <div className='payment-page'>
      <Header />
      <div className='cart-and-form-wrapper'>
        <div className='cart-box'>
          <span className='cart-title'>Revise seus produtos</span>
          {cartItems.length === 0 ? (
            <span className='empty-cart'>Seu carrinho está vazio</span>
          ) : (
            cartItems.map((item, index) => (
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
                  <span>{`R$${(item.price * item.quantity).toFixed(2)}`}</span>
                </div>
                <hr />
              </div>
            ))
          )}
          <span>{`Subtotal: ${subTotal}`}</span>
          <span>{frete === 0 ? `Frete Gratis!` : `Frete: ${frete}`}</span>
          <span>{`${cartItems.length} items: R$${totalPrice.toFixed(2)}`}</span>
        </div>
        <div className='form-wrapper'>
          <span className='informations-title'>Informações do comprador:</span>
          <form action=''>
            <input
              type='name'
              placeholder='Nome Completo*'
              onChange={({ target: { value } }) => setUsername(value)}
            />
            <input
              type='cpf'
              placeholder='CPF*'
              onChange={({ target: { value } }) => setCPF(value)}
            />
            <input
              type='email'
              placeholder='Email*'
              onChange={({ target: { value } }) => setEmail(value)}
            />
            <input
              type='phone'
              placeholder='Telefone Celular'
              onChange={({ target: { value } }) => setPhone(value)}
            />
            <input
              type='phone'
              placeholder='Telefone Residencial'
              onChange={({ target: { value } }) => setPhone(value)}
            />
            <input
              type='adress'
              placeholder='Endereço*'
              onChange={({ target: { value } }) => setAdress(value)}
            />
            <input
              type='text'
              placeholder='Complemento'
              onChange={({ target: { value } }) => setAdressComplement(value)}
            />
            <input
              type='text'
              placeholder='Número'
              onChange={({ target: { value } }) => setAdressNumber(value)}
            />
            <input
              type='Cidade'
              placeholder='Cidade*'
              onChange={({ target: { value } }) => setAdressCity(value)}
            />
            <select
              onChange={({ target: { value } }) => setAdressState(value)}
              className='states-select'
            >
              <option value=''>UF*</option>
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
              placeholder='Número do cartão*'
              onChange={({ target: { value } }) => setCardNumber(value)}
            />
            <input
              type='text'
              placeholder='Data de vencimento*'
              onChange={({ target: { value } }) => setCardExpiration(value)}
            />
            <input
              type='tex'
              placeholder='CVC*'
              onChange={({ target: { value } }) => setCardCVC(value)}
            />
          </form>
          <button className='payment-button' onClick={() => validatePayment()}>
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
