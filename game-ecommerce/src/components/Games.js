import React from 'react';
import products from '../products.json'
import '../styles/Games.css'

const Games = () => {

    const addToCart = (game) => {
        let cartItems;
        if(localStorage.getItem('games')){
          cartItems = [...JSON.parse(localStorage.getItem('games')), game] 
        } else {
          cartItems = [game];
        }
        localStorage.setItem('games', JSON.stringify(cartItems))
    }

    return(
        <div className='games-content'>
            <select className='filter'>
                <option value="preço">Ordernar por preço</option>
                <option value="popularidade">Ordernar por popularidade</option>
                <option value="alfabetica">Ordernar por ordem alfabética</option>
            </select>
            <div className='games-list'>
            {products.map((game, index) => (
                <div className='game' key={index}>
                    <div className='id-and-score'>
                    <span className='game-id'>{`ID:${game.id}`}</span>
                    <span className='game-score'>{`Score:${game.score}`}</span>
                    </div>
                    <img src={require(`../images/${game.image}`)} alt={game.name} />
                    <span className='game-name'>{game.name}</span>
                    <span className='game-price'>{`R$${game.price.toFixed(2)}`}</span>
                    <button 
                    type='button' 
                    className='add-to-cart'
                    onClick={() => addToCart(game)}
                    >Adicionar ao carrinho</button>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Games