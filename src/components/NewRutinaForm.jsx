


import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext';



const NewRutinaForm = ({setMostrarAltaRP,setRutinas}) => {
    
    const navigate = useNavigate();
    //const [entrenadores, setEntrenadores] = useState([]);
    //const [nombreClie, setNombreClie] = useState('');
    const [descrRuti, setDescrRuti] = useState('');
    const { idEntr , guardarTipoUsuario } = useContext(AuthContext);
    const [isChecked, setIsChecked] = useState(false);

    // const location = useLocation();
    // Obtén idEntr desde location.state
    //const { idEntr } = location.state || { idEntr: null }; // Usar un valor por defecto

    const handleSubmit = async (e) => {
        e.preventDefault()

        // convert to an object
        //const diaLbrazos: 

       
        // Creando el objeto con los datos que se van a enviar al servidor
        const formData = {
            descrRuti: descrRuti,
            idEntrRuti: idEntr,
            diaLbrazosRuti: isChecked ? 'S' : 'N'
        };


        console.log('Form data: ',formData);

        //send request post
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/rutinas/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                console.error('Response was not OK')
            }

            const nuevaRutina = await response.json()
            console.log("newrutiForm...respdata: ",nuevaRutina)

            /* try {
                const responseEntr = await fetch(process.env.REACT_APP_API_URL + `/entrenadores/idEntr/${idEntr}`)
                
                if (!responseEntr.ok) {
                  throw new Error(`Error: ${responseEntr.status}`);
                }
                const dataEntr = await responseEntr.json()
                //navigate('/entrenador/profile', { state: { ...dataEntr } });
            } catch (error) {console.error(error.message)}
 */
            guardarTipoUsuario("esEntrenador")
            setMostrarAltaRP(false)
            setRutinas(prevRutinas => [...prevRutinas, nuevaRutina]);
            
        }catch (error) { console.error(error.message)}
    }
    ////

    const handleCancelar = async (e) => {
        setMostrarAltaRP(false)
    }

    return (
        <div className="form-container">      
            <h2>Alta de nueva rutina</h2>      
            <form method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="descrRutina">Descripción de la rutina:</label>
                    <textarea
                    type="text"
                    id="descrRuti"
                    value={descrRuti}
                    onChange={(e) => setDescrRuti(e.target.value)}
                    />
                </div>
                <div>
                <label htmlFor="descrRutina">Lunes: ¿entramiento de brazos? </label>
                    <input
                    type="checkbox"
                    checked={isChecked}
                    //value={diaLbrazosRuti}
                    onChange={() => setIsChecked(!isChecked)}
                    />
                </div>
                <button className="btn btn-new" type="submit">Añadir rutina</button>
            </form>
            <button className="btn btn-neutro" onClick={handleCancelar}>Cancelar</button>
        
        </div>
    )

}
export default NewRutinaForm