

import React, { useContext , useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import ClienteProfile from './ClienteProfile';
import EntrenadorProfile from './EntrenadorProfile';
import NewEntrenadorForm from './NewEntrenadorForm';
import NewClientForm from './NewClientForm';

const Main = () => {
    const { isAuthenticated , tipoUsuario, login, logout} = useContext(AuthContext);
    const [mostrarAlta, setMostrarAlta] = useState(null);

    useEffect(() => {
        console.log('tipoUsuario:', tipoUsuario);
    }, [tipoUsuario]);
    useEffect(() => {
        console.log('mostraralta:', mostrarAlta);
    }, [mostrarAlta]);

    const handleClickAltaCliente = () => {
        setMostrarAlta("altaCliente");
        //navigate('/entrenador/cliente');
      }

    const handleClickAltaEntrenador = () => {
        setMostrarAlta("altaEntrenador");
        //navigate('/entrenador/cliente');
      }
    return (
        /* ya no se muestran los entrenadores nada mas entrar: elimino esto del main:   <PrincipalEntrenadores />   */
        <main>
           { isAuthenticated && (
            <div>
            {tipoUsuario && typeof tipoUsuario === 'string' && (
                <>
                    {tipoUsuario.includes('noRegistrado') && (
                        <>
                            {!mostrarAlta && (
                                <>
                                <h3> hola usuario autenticado...pero no estás dado de alta en el gimnasio... </h3>
                                <button onClick={handleClickAltaCliente}>DARSE DE ALTA COMO CLIENTE</button>
                                <button onClick={handleClickAltaEntrenador}>DARSE DE ALTA COMO ENTRENADOR</button>
                                </>
                            )}
                            {mostrarAlta && mostrarAlta.includes('altaCliente') && (
                                <NewClientForm setMostrarAlta={setMostrarAlta}/>
                            )}
                            {mostrarAlta && mostrarAlta.includes('altaEntrenador') && (
                                <NewEntrenadorForm setMostrarAlta={setMostrarAlta}/>
                            )}
                        </>
                    )}
                    {tipoUsuario.includes('esEntrenador') && (
                        <EntrenadorProfile setMostrarAlta={setMostrarAlta}/>
                    )}
                    {tipoUsuario.includes('esCliente') && (
                        <ClienteProfile setMostrarAlta={setMostrarAlta}/>
                    )}
                </>
            )}
            {/* Si tipoUsuario no es una cadena, puedes mostrar un mensaje de error o un componente de carga */}
            {!tipoUsuario && <p>Cargando tipo de usuario...</p>}
            </div>
           )}
           { !isAuthenticated && (
            <p> Inicia sesión, arriba a la derecha . . .</p>
           )}
        </main>
    )

}
export default Main