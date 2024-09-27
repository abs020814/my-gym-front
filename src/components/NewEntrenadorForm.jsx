
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';



const NewEntrenadorForm = ({setMostrarAlta}) => {
    
    const { email , guardarTipoUsuario} = useContext(AuthContext);

    const [nombreEntr, setNombreEntr] = useState('');
    const [datosEntr, setDatosEntr] = useState('');
    const [especEntr, setEspecEntr] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Creando el objeto con los datos que se van a enviar al servidor
        const formData = {
            nombreEntr: nombreEntr,
            datosEntr: datosEntr,
            fecAltaEntr: new Date().toISOString(), // Fecha actual en formato ISO
            especEntr: especEntr,
            emailEntr: email
        };

        if (!nombreEntr || !datosEntr || !especEntr || !email) {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        console.log('Form data: ',formData);

        //send request post
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/entrenadores/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                console.error('Response was not OK: ',response.body)
                alert('No se pudo dar de alta. Por favor, revisa los campos');
                return;
            }
            else {
                const responseData = await response.json()
                console.log(responseData)

                guardarTipoUsuario("esEntrenador")
                setMostrarAlta(false)
            }
            //navigate("/cliente/profile");

        }catch (error) { console.error(error.message)}
    }
    ////

/* 
    useEffect(() => {
        // Llamada a la API de entrenadores para rellenar el listado
        const fetchEntrenadores = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + '/entrenadores/', {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': true
                    }
                })
                const data = await response.json()
                setEntrenadores(data)
            } catch (error) {console.error(error.message)}
        }

        fetchEntrenadores() 
    }, []); */

    return (
        <div className="form-container">            
            <form method="post" onSubmit={handleSubmit}>
                <div>
                    <p>(email) {email}</p>
                    <label htmlFor="nombreEntr">Nombre del Entrenador:</label>
                    <input
                    type="text"
                    id="nombreEntr"
                    value={nombreEntr}
                    onChange={(e) => setNombreEntr(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="datosEntr">Datos del entrenador:</label>
                    <input
                    type="text"
                    id="datosEntr"
                    value={datosEntr}
                    onChange={(e) => setDatosEntr(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="especEntr">Especialidad:</label>
                    <input
                    type="text"
                    id="especEntr"
                    value={especEntr}
                    onChange={(e) => setEspecEntr(e.target.value)}
                    />
                </div>
                <button type="submit">Add Entrenador</button>
            </form>
        
        </div>
    )

}
export default NewEntrenadorForm