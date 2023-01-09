import React from 'react';
import { createBrowserHistory } from '@remix-run/router';
import './App.css';
import Routes from './Routes';
import { SessionProvider } from './context/itens.context';

const history = createBrowserHistory();

function App() {
  return (
    <div className='App'>
      <SessionProvider>
      <Routes history={history} />
      </SessionProvider>
    </div>
  );
}

export default App;
