
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
        

const NewClientForm = ({setMostrarAlta}) => {
    
    const { email , guardarTipoUsuario} = useContext(AuthContext);

    const [entrenadores, setEntrenadores] = useState([]);
    const [nombreClie, setNombreClie] = useState('');
    const [objetivosClie, setObjetivosClie] = useState('');
    const [fecObjetivoClie, setFecObjetivoClie] = useState('');
    const [pesoClie, setPesoClie] = useState('');
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;

    const [selectedEntrenador, setSelectedEntrenador] = useState(null);
    
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
            idNutrClie: 0
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
            const response = await fetch(process.env.REACT_APP_API_URL + '/clientes/conEntr', {
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

                guardarTipoUsuario("esCliente")
                setMostrarAlta(false)  /*************/
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

    return (
        <>
        <h1>Alta de Cliente</h1>
        <div className="form-container">            
            <form method="post" onSubmit={handleSubmit}>
                <p>(email) {email}</p>                    
                <div className="form-div">
                    <label  className="form-label" htmlFor="nombreClie">Nombre del Cliente:</label>
                    <input
                    className="form-input"
                    type="text"
                    id="nombreClie"
                    value={nombreClie}
                    required
                    onChange={(e) => setNombreClie(e.target.value)}
                    />
                </div>
                <div className="form-div">
                    <label  className="form-label" htmlFor="objetivosClie">Objetivos del Cliente:</label>
                    <input
                    className="form-input"
                    type="text"
                    id="objetivosClie"
                    value={objetivosClie}
                    required
                    onChange={(e) => setObjetivosClie(e.target.value)}
                    />
                </div>
                <div className="form-div">
                    <label  className="form-label" htmlFor="fecObjetivoClie">Fecha objetivo del Cliente:</label>
                    <input
                    className="form-input"
                    type="text"
                    id="fecObjetivoClie"
                    value={fecObjetivoClie}
                    required
                    onChange={(e) => setFecObjetivoClie(e.target.value)}
                    />
                </div>
                <div className="form-div">
                    <label  className="form-label"  htmlFor="fecObjetivoClie">Tu peso actual:</label>
                    <input
                    className="form-input" 
                    type="text"
                    id="pesoClie"   
                    value={pesoClie}
                    required
                    onChange={(e) => setPesoClie(e.target.value)}
                    />
                </div>
                <div className="form-item">
                    <h3>Por último, selecciona un Entrenador:
                        
                    </h3>
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
                        <table>
                            <tr><td>{entrenador.nombreEntr}</td>
                                <td>{entrenador.especEntr}</td>
                            </tr>
                        </table>
                        </li>
                    ))}
                    </ul>
                </div>
                <button className="btn btn-new" type="submit">Add client</button>
            </form>
        
        </div>
        </>
    )

}
export default NewClientForm