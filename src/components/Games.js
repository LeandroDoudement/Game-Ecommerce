/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import products from '../products.json';
import '../styles/Games.css';

const Games = () => {
  const [filterOrder, setFilterOrder] = useState('');
  const [gamesList, setGamesList] = useState([]);
  const [newGamesList, setNewGamesList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setGamesList([]);
    switch (filterOrder) {
      case 'popularidade':
        setNewGamesList([...products].sort((a, b) => b.score - a.score));
        break;
      case 'alfabetica':
        setNewGamesList(
          [...products].sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          })
        );
        break;
      case 'preço':
        setNewGamesList([...products].sort((a, b) => b.price - a.price));
        break;
      default:
        setNewGamesList(products);
    }
  }, [filterOrder]);

  useEffect(() => {
    setGamesList(newGamesList);
    setLoading(false);
  }, [newGamesList]);

  const addToCart = (game) => {
    let cartItems;
    const checkIfAlreadyExists = localStorage.getItem('games')
      ? JSON.parse(localStorage.getItem('games')).some(
          (element) => JSON.stringify(element) === JSON.stringify(game)
        )
      : false;
    if (checkIfAlreadyExists) {
      alert(
        'Você já adicionou esse produto, para aumentar a quantidade siga ao carrinho'
      );
      return;
    }
    if (localStorage.getItem('games')) {
      cartItems = [...JSON.parse(localStorage.getItem('games')), game];
    } else {
      cartItems = [game];
    }
    localStorage.setItem('games', JSON.stringify(cartItems));
  };

  return (
    <div className='games-content'>
      <select
        className='filter'
        onChange={({ target: { value } }) => setFilterOrder(value)}
        data-testid='filter'
      >
        <option value=''>Ordernar por</option>
        <option value='popularidade'>Ordernar por popularidade</option>
        <option value='alfabetica'>Ordernar por ordem alfabética</option>
        <option value='preço'>Ordernar por preço</option>
      </select>
      <div className='games-list'>
        <div className='games-wrapper'>
        {loading ? (
          <Loading />
        ) : (
          gamesList.map((game) => (
            <div className='game' key={game.id} data-testid='game'>
              <div className='score'>
                <span className='game-score'>{`Score:${game.score}`}</span>
              </div>
              <img src={require(`../images/${game.image}`)} alt={game.name} className='game-image' />
              <span className='game-name' data-testid='game-name'>
                {game.name}
              </span>
              <span className='game-price'>{`R$${game.price.toFixed(2)}`}</span>
              <button
                type='button'
                className='add-to-cart'
                onClick={() => addToCart(game)}
                data-testid='add-to-cart-button'
              >
                Adicionar ao carrinho
              </button>
            </div>
          ))
        )}
      </div>
      </div>
    </div>
  );
};

export default Games;
