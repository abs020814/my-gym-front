

import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';

const ModifClientForm = ({setMostrarModifClie , cliente}) => {
    
    const { email , guardarTipoUsuario} = useContext(AuthContext);

    const [entrenadores, setEntrenadores] = useState([]);
    const [nombreClie, setNombreClie] = useState('');
    const [objetivosClie, setObjetivosClie] = useState('');
    const [fecObjetivoClie, setFecObjetivoClie] = useState('');
    const [avisoCambioEntr, setAvisoCambioEntr] = useState(false);
    const [pesoClie, setPesoClie] = useState('');
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;

    const [selectedEntrenador, setSelectedEntrenador] = useState(null);
    
    useEffect(() => {
        if (cliente) {
          setNombreClie(cliente.nombreClie);
          setObjetivosClie(cliente.objetivosClie);
          setFecObjetivoClie(cliente.fecObjetivoClie);
          setPesoClie(cliente.pesoClie);
          setSelectedEntrenador(cliente.idEntrClie);
        }
      }, [cliente]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("selectedEntrenador: ",selectedEntrenador)
        // convert to an object
        
       
        // Creando el objeto con los datos que se van a enviar al servidor
        const formData = {
            nombreClie: nombreClie,
            objetivosClie: objetivosClie,
            fecAltaClie: new Date().toISOString(), // Fecha actual en formato ISO
            pesoClie: parseFloat(pesoClie).toFixed(2), // Asegurar dos decimales         
            fecObjetivoClie: fecObjetivoClie,
            idEntrClie: selectedEntrenador,
            emailClie: email,
            idRutiClie: 0,
            idNutrClie: 0,
            idClie: cliente.idClie
        };


        if (!fechaRegex.test(fecObjetivoClie)) {
            alert('Formato de fecha incorrecto. Debe ser yyyy-mm-dd');
            return;
        }
        if (!nombreClie || !objetivosClie || !fecObjetivoClie || !pesoClie || !selectedEntrenador || !email) {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        console.log('Form data: ',formData);

        //send request post
        try {
            console.log("json.body: ",JSON.stringify(formData))
            const response = await fetch(process.env.REACT_APP_API_URL + '/clientes/conEntr', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                console.error('Response was not OK: ',response.body)
                alert('No se pudo modificar. Por favor, revisa los campos');
                return;
            }
            else {
                const responseData = await response.json()
                console.log(responseData)

                guardarTipoUsuario("esCliente")
                setMostrarModifClie(false)
            }
            //navigate("/cliente/profile");

        }catch (error) { console.error(error.message)}
    }
    ////

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
    }, []);

    const handleVolver = async () => {
        setMostrarModifClie(false)
    }

    return (
        <div className="form-container">            
            <form method="post" onSubmit={handleSubmit}>
                <div>
                    <p>(email) {email}</p>
                    <label htmlFor="nombreClie">Nombre del Cliente:</label>
                    <input
                    type="text"
                    id="nombreClie"
                    value={nombreClie}
                    onChange={(e) => setNombreClie(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="objetivosClie">Objetivos del Cliente:</label>
                    <input
                    type="text"
                    id="objetivosClie"
                    value={objetivosClie}
                    onChange={(e) => setObjetivosClie(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="fecObjetivoClie">Fecha objetivo del Cliente:</label>
                    <input
                    type="text"
                    id="fecObjetivoClie"
                    value={fecObjetivoClie}
                    onChange={(e) => setFecObjetivoClie(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="fecObjetivoClie">Tu peso actual:</label>
                    <input
                    type="text"
                    id="pesoClie"   
                    value={pesoClie}
                    onChange={(e) => setPesoClie(e.target.value)}
                    />
                </div>
                <div className="form-item">
                    <label>Selecciona un Entrenador:
                    <ul>
                    {entrenadores.map((entrenador) => (
                        <li
                        key={entrenador.idEntr}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: selectedEntrenador === entrenador.idEntr ? 'lightgreen' : 'white'
                        }}
                        onClick={() => setSelectedEntrenador(entrenador.idEntr)}
                        >
                        {entrenador.nombreEntr}
                        </li>
                    ))}
                    </ul>
                    </label>
                    <p className="pequenoAviso">Si cambias de entrenador y tenías rutina o plan de nutrición asignado, lo/s mantendrás hasta que tu nuevo entrenador/a te asigne el plan y/o la rutina que él/ella gestione</p>
                </div>
                <button className="btn btn-info" type="submit">Modif client</button>
            </form>
            <button className="btn btn-neutro" onClick={handleVolver}>Volver sin cambios</button>
        </div>
    )

}
export default ModifClientForm

