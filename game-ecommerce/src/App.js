import { createBrowserHistory } from '@remix-run/router';
import './App.css';
import Routes from './Routes';

const history = createBrowserHistory();

function App() {
  return (
    <div className='App'>
      <Routes history={history} />
    </div>
  );
}

export default App;
