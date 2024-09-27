import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext';



const NewNutricionForm = ({setMostrarAltaRP,setNutricions}) => {
    
    const navigate = useNavigate();
    //const [entrenadores, setEntrenadores] = useState([]);
    //const [nombreClie, setNombreClie] = useState('');
    const [descrNutr, setDescrNutr] = useState('');
    const { idEntr , guardarTipoUsuario } = useContext(AuthContext);

    // const location = useLocation();
    // Obtén idEntr desde location.state
    //const { idEntr } = location.state || { idEntr: null }; // Usar un valor por defecto

    const handleSubmit = async (e) => {
        e.preventDefault()

        // convert to an object
        
       
        // Creando el objeto con los datos que se van a enviar al servidor
        const formData = {
            descrNutr: descrNutr,
            idEntrNutr: idEntr
        };

        console.log('Form data: ',formData);

        console.log("json..form: ",JSON.stringify(formData))
        //send request post
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/nutricion/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                console.error('Response was not OK')
            }

            const nuevaNutricion = await response.json()
            console.log(nuevaNutricion)

            guardarTipoUsuario("esEntrenador")
            setMostrarAltaRP(false)
            setNutricions(prevNutricions => [...prevNutricions, nuevaNutricion]);


        }catch (error) { console.error(error.message)}
    }
    ////


    return (
        <div className="form-container">      
            <h2>Alta de nuevo plan nutrición</h2>      
            <form method="post" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="descrNutr">Descripción del plan:</label>
                    <textarea
                    type="text"
                    id="descrNutr"
                    value={descrNutr}
                    onChange={(e) => setDescrNutr(e.target.value)}
                    />
                </div>
                <button className="btn btn-new" type="submit">Añadir plan</button>
            </form>
        
        </div>
    )

}
export default NewNutricionForm