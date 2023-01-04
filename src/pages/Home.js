import React from 'react';
import Header from '../components/Header';
import Games from '../components/Games';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className='homepage'>
      <Header />
      <Games />
    </div>
  );
};

export default Home;
