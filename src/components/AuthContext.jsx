
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const  [isAuthenticated, setIsAuthenticated] = useState(false);   
    const  [tipoUsuario, setTipoUsuario] = useState(null);
    const  [email, setEmail] = useState(null)
    const  [idEntr, setIdEntr] = useState(null)
    const  [idClie, setIdClie] = useState(null)

    console.log("authhemail: ",email)
    // Función para verificar la autenticación (por ejemplo, llamando a una API)
    const checkAuthentication = async () => {
        const token = localStorage.getItem('token'); // Comprueba si hay un token en localStorage
        //console.log("en authContex....token: ",token);
        if (token) {
            setIsAuthenticated(true); 

            // Envía el token al backend para validarlo y obtener la sesión
            const res = await fetch(process.env.REACT_APP_API_URL + "/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
          });
  
          if (!res.ok) {
            //throw new Error(`Error: ${res.status}`);
            setIsAuthenticated(false)
          } 
  
          const dataAuth = await res.json();
          console.log("authCtx..dataAu:", dataAuth);
  
          const respUsuario = await fetch(process.env.REACT_APP_API_URL + `/usuarios/email?email=${dataAuth.email}`)
          if (!respUsuario.ok) {
            throw new Error(`Error: ${respUsuario.status}`);
          }
          const dataRespUsu = await respUsuario.json()
          console.log("authCtx..respUs: ",dataRespUsu);

          setEmail(dataAuth.email)
          setTipoUsuario( dataRespUsu)

       }
    };

    const login = () => {
      setIsAuthenticated(true);
    };
    const logout = () => {
      setIsAuthenticated(false);
    };
  
    const guardarIdEntr = (idEntr) => {
      console.log("authCtx..guardoIdEntr: ",idEntr )
      setIdEntr(idEntr);
    }
  
    const guardarIdClie = (idClie) => {
      console.log("authCtx..guardoIdClie: ",idClie)
      setIdClie(idClie);
    }
  
    const guardarTipoUsuario = (tipo) => {
      console.log("authCtx..guardoTipoU: ",tipo)
      setTipoUsuario(tipo);
    }

    useEffect(() => {
        checkAuthentication();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated , tipoUsuario , login, logout, guardarIdEntr, guardarIdClie, 
                                      guardarTipoUsuario, email, idEntr, idClie}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext; // Exporta AuthContext por defecto



