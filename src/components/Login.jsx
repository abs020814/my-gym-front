import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { AuthProvider } from './AuthContext';
import AuthContext from './AuthContext';

import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';


function Login () {
    const { isAuthenticated , tipoUsuario, login, logout} = useContext(AuthContext);

    const navigate = useNavigate()
    const HandleLoginSuccess = async (response) => {
        const token = response.credential;
        console.log("token: ",token);

        localStorage.setItem('token', token); // Guardar el token en localStorage

        // Envía el token al backend para validarlo y obtener la sesión
        const res = await fetch("http://localhost:8000/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        } 

        const dataAuth = await res.json();
        console.log("User data from FastAPI:", dataAuth);

        login()

        navigate('/')
      };
    
      return (
        <AuthProvider >
        <GoogleOAuthProvider clientId="859314345775-ne6gm0veepa4ntsajkpgm6qaga17e29j.apps.googleusercontent.com">
          <div className="Login">
            <h1>Acceso con Google</h1>
            <GoogleLogin
              onSuccess={HandleLoginSuccess}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </GoogleOAuthProvider>
        </AuthProvider >

      );
}
export default Login