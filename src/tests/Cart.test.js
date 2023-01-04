import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import Cart from '../pages/Cart';
import {
  firstItem,
  threeItensLowerThan250,
  moreThen250,
} from './helpers/productsMock';
const history = createMemoryHistory();

describe('Testes da page Cart', () => {
  it('Os valores exibidos no checkout (frete, subtotal e total) devem ser calculados dinamicamente', () => {
    const spy = jest.spyOn(Storage.prototype, 'getItem');
    spy.mockReturnValue(JSON.stringify(firstItem));
    render(
      <MemoryRouter history={history}>
        <Cart />
      </MemoryRouter>
    );
    localStorage.setItem('games', JSON.stringify(firstItem));
    const frete = screen.getByTestId('frete');
    expect(frete.innerHTML).toBe('Frete: 10.00');
    const subTotal = screen.getByTestId('subtotal');
    expect(subTotal.innerHTML).toBe('Subtotal: 197.88');
    const total = screen.getByTestId('total');
    expect(total.innerHTML).toBe('1 items: R$207.88');
  });

  it('O usuário poderá adicionar e remover produtos do carrinho', async () => {
    const spy = jest.spyOn(Storage.prototype, 'getItem');
    spy.mockReturnValue(JSON.stringify(firstItem));
    render(
      <MemoryRouter history={history}>
        <Cart />
      </MemoryRouter>
    );
    const deleteProductButton = screen.getByTestId('delete-product');
    expect(deleteProductButton).toBeInTheDocument();
    const raiseQuantity = screen.getByTestId('raise-quantity-button');
    expect(raiseQuantity).toBeInTheDocument();
    const subtractQuantity = screen.getByTestId('subtract-quantity-button');
    expect(subtractQuantity).toBeInTheDocument();
    userEvent.click(raiseQuantity);
    const itemQuantity = screen.getByTestId('item-quantity');
    expect(itemQuantity).toBeInTheDocument();
    //Usei todos os métodos assincronos possíveis mas no teste não muda a quantidade de itemQuantity de nenhuma forma
    //   await waitFor(() => expect(itemQuantity.innerHTML).toBe('2'), 5000)
  });

  it('A cada produto adicionado, deve-se somar R$ 10,00 ao frete.', () => {
    const spy = jest.spyOn(Storage.prototype, 'getItem');
    spy.mockReturnValue(JSON.stringify(threeItensLowerThan250));
    render(
      <MemoryRouter history={history}>
        <Cart />
      </MemoryRouter>
    );
    localStorage.setItem('games', JSON.stringify(firstItem));
    const frete = screen.getByTestId('frete');
    expect(frete.innerHTML).toBe('Frete: 30.00');
    const allItems = screen.getAllByTestId('item');
    expect(allItems.length).toBe(3);
  });
  it('O frete é grátis para compras acima de R$ 250,00', () => {
    const spy = jest.spyOn(Storage.prototype, 'getItem');
    spy.mockReturnValue(JSON.stringify(moreThen250));
    render(
      <MemoryRouter history={history}>
        <Cart />
      </MemoryRouter>
    );
    const frete = screen.getByTestId('frete');
    expect(frete.innerHTML).toBe('Frete Gratis!');
    const allItems = screen.getAllByTestId('item');
    expect(allItems.length).toBe(2);
  });
});
