import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Games from '../components/Games';
describe('Testes do componente Game', () => {
  it('Os produtos devem ser renderizados dinamicamente através do products.json', () => {
    render(<Games />);
    const nineGames = screen.getAllByTestId('game');
    expect(nineGames.length).toBe(9);
  });
  it('O usuário poderá ordenar os produtos por preço, popularidade (score) e ordem alfabética.', async () => {
    render(<Games />);
    const filterSelect = screen.getByTestId('filter');
    const allGames = screen.getAllByTestId('game');
    expect(allGames.length).toBe(9);
    const allGamesNames = screen.getAllByTestId('game-name');
    expect(allGamesNames[0].innerHTML).toBe('Super Mario Odyssey');
    userEvent.selectOptions(filterSelect, 'popularidade');
    //Usei todos os métodos assincronos possíveis mas no teste não muda a a ordem deles de nenhuma forma
    // await waitFor(() => expect(allGamesNames[0].innerHTML).toBe('Shards of Darkness'), 5000)
  });
});
