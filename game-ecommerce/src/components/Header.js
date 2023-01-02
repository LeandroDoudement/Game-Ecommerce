import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import controller from '../images/controller.png';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header>
      <img src={controller} alt='logo' className='logo' />
      <FontAwesomeIcon
        icon={faCartShopping}
        className='cart-icon'
        onClick={() => navigate('/cart')}
      />
    </header>
  );
};

export default Header;
