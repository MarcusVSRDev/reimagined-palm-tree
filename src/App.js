import { NavLink, useHistory } from 'react-router-dom';
import './App.css';
import Routes from './routes';
import { logout } from './Services/utils';

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
          <ul>
            <li>
              <NavLink to="/">Login</NavLink>
            </li>
            <li>
              <NavLink to="/registro">Registrar</NavLink>
            </li>
            <li>
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
