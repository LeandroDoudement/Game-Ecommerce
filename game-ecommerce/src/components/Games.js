import React from 'react';
import products from '../products.json'
const Games = () => {
    return(
        <div className='games-list'>
            {products.map((game, index) => (
                <div className='game' key={index}>
                    <span className='game-id'>{game.id}</span>
                    <span className='game-score'>{game.score}</span>
                    <img src={`../images/${game.image}`} alt={game.name} />
                    <span className='game-id'>{game.id}</span>
                    <span className='game-name'>{game.name}</span>
                    <span className='game-price'>{game.price}</span>
                </div>
            ))}
        </div>
    )
}

export default Games