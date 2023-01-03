import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import controller from '../images/controller.png';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <div className='home-wrapper'>
      <FontAwesomeIcon 
      icon={faHouse}
      onClick={() => navigate('/')}
      className='home-icon' />
      <span className='icon-title'>Home</span>
      </div>
      <img src={controller} alt='logo' className='logo' />
      <div className='cart-wrapper'>
      <FontAwesomeIcon
        icon={faCartShopping}
        className='cart-icon'
        onClick={() => navigate('/cart')}
      />
      <span className='icon-title'>Carrinho</span>
      </div>
    </header>
  );
};

export default Header;
