import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect , useState, useContext} from 'react';
import AuthContext from './AuthContext';

const Header = () => {
  const { isAuthenticated , tipoUsuario, login, logout} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  // [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Comprobar si el usuario está autenticado al cargar la página
  useEffect(() => {
    const token = localStorage.getItem('token'); // Comprueba si hay un token en localStorage
    //console.log(token);
    if (token) {
      login()
    }
    setIsLoading(false)
  }, []);

  // Función para manejar el Logout
  const handleLogout = () => {
    // Eliminar el token de autenticación
    localStorage.removeItem('token');
    //setIsAuthenticated(false); // El usuario sale
    logout();
    // Redirigir a la página principal
    navigate('/'); // Asegúrate de que esto ocurre tras limpiar el estado
  };

  return (
    <header>
      <h1 className="header-title">Mi Gym</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div className="menu">        
          {isAuthenticated ? (
            <li>
              {/* Cambiado a botón en vez de Link para manejar mejor el Logout */}
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
