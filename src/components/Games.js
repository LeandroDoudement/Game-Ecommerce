import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import products from '../constants/products';
import '../styles/Games.css';
import numberFormatter from '../helpers/numberFormatter'
import { useSession } from '../context/itens.context';

const Games = () => {
  const [filterOrder, setFilterOrder] = useState('');
  const [gamesList, setGamesList] = useState([]);
  const [newGamesList, setNewGamesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const {itens, setItens} = useSession()

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
    const item = itens.find((item) => item.id === game.id);
    let cartItems = [...itens];
    if (item) {
      cartItems = itens.map((elem) => {
        console.log({elem, game})
        return elem.id === game.id
          ? { ...elem, quantity: elem.quantity + 1 }
          : elem;
      });
    } else {
      cartItems.push(game);
    }
    setItens(cartItems);
  };

  return (
    <div className='games-content'>
      <select
        className='filter'
        onChange={({ target: { value } }) => setFilterOrder(value)}
        data-testid='filter'
      >
        <option value=''>Ordenar por</option>
        <option value='popularidade'>Ordenar por popularidade</option>
        <option value='alfabetica'>Ordenar por ordem alfabética</option>
        <option value='preço'>Ordenar por preço</option>
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
                <img
                  src={require(`../images/${game.image}`)}
                  alt={game.name}
                  className='game-image'
                />
                <span className='game-name' data-testid='game-name'>
                  {game.name}
                </span>
                <span className='game-price'>{`R$${numberFormatter(game.price)}`}</span>
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
