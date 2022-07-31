import { NavLink, useHistory } from 'react-router-dom';
import './App.css';
import Routes from './routes';
import { logout } from './Services/utils';
import imagemLinkedin from './img/logo-linkedin-actuel.jpg'

function App() {
  const history = useHistory();
  function handleLogout() {
    logout();
    history.push("/");
  }
  return (
    <div className='App'>
      <header>
        <nav>
          <img src={imagemLinkedin}></img>
          <ul className='text'>
            <li className="login">
              <NavLink to="/">Login</NavLink>
            </li>
            <li className="logout">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
      <Routes />
    </div>
  );
}

export default App;
