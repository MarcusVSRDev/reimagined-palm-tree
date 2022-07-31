import { NavLink, useHistory } from 'react-router-dom';
import './App.css';
import Routes from './routes';
import { logout } from './Services/utils';
import imagemLinkedin from './img/logo-linkedin-actuel.jpg'

function App() {
  return (
    <div className='App'>
      <header>
        <nav>
          <img src={imagemLinkedin}></img>
        </nav>
      </header>
      <Routes />
    </div>
  );
}

export default App;
