


import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext';



const NewRutinaForm = ({setMostrarAltaRP,setRutinas}) => {
    
    const navigate = useNavigate();
    //const [entrenadores, setEntrenadores] = useState([]);
    //const [nombreClie, setNombreClie] = useState('');
    const [descrRuti, setDescrRuti] = useState('');
    const { idEntr , guardarTipoUsuario } = useContext(AuthContext);
    const [isCheckedBrLu, setIsCheckedBrLu] = useState(false);
    const [isCheckedBrMa, setIsCheckedBrMa] = useState(false);
    const [isCheckedBrMi, setIsCheckedBrMi] = useState(false);
    const [isCheckedBrJu, setIsCheckedBrJu] = useState(false);
    const [isCheckedBrVi, setIsCheckedBrVi] = useState(false);
    const [isCheckedTrLu, setIsCheckedTrLu] = useState(false);
    const [isCheckedTrMa, setIsCheckedTrMa] = useState(false);
    const [isCheckedTrMi, setIsCheckedTrMi] = useState(false);
    const [isCheckedTrJu, setIsCheckedTrJu] = useState(false);
    const [isCheckedTrVi, setIsCheckedTrVi] = useState(false);

    // const location = useLocation();
    // Obtén idEntr desde location.state
    //const { idEntr } = location.state || { idEntr: null }; // Usar un valor por defecto

    const handleSubmit = async (e) => {
        e.preventDefault()

        // convert to an object
        //const diaLbrazos: 

        const diaBrLu = isCheckedBrLu ? 'L' : ''
        const diaBrMa = isCheckedBrMa ? 'M' : ''
        const diaBrMi = isCheckedBrMi ? 'X' : ''
        const diaBrJu = isCheckedBrJu ? 'J' : ''
        const diaBrVi = isCheckedBrVi ? 'V' : ''
        const diaTrLu = isCheckedTrLu ? 'L' : ''
        const diaTrMa = isCheckedTrMa ? 'M' : ''
        const diaTrMi = isCheckedTrMi ? 'X' : ''
        const diaTrJu = isCheckedTrJu ? 'J' : ''
        const diaTrVi = isCheckedTrVi ? 'V' : ''
        

        // Creando el objeto con los datos que se van a enviar al servidor
        const formData = {
            descrRuti: descrRuti,
            idEntrRuti: idEntr,
            diasBrazosRuti: diaBrLu + diaBrMa + diaBrMi + diaBrJu + diaBrVi,
            diasTroncoRuti: diaTrLu + diaTrMa + diaTrMi + diaTrJu + diaTrVi,
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
                    <label htmlFor="descrRuti">Descripción de la rutina:</label>
                    <textarea
                    type="text"
                    id="descrRuti"
                    value={descrRuti}
                    onChange={(e) => setDescrRuti(e.target.value)}
                    />
                </div>
                <table>
                    <td>
                        <tr>
                            <label>Ejercicios de brazos:</label>
                            <div>
                                <label htmlFor="brazosLRuti">Lunes: </label>
                                <input
                                type="checkbox"
                                checked={isCheckedBrLu}
                                //value={diaLbrazosRuti}
                                onChange={() => setIsCheckedBrLu(!isCheckedBrLu)}
                                />
                            </div>
                        </tr>
                        <tr>
                            <div>
                                <label htmlFor="brazosMRuti">Martes: </label>
                                <input
                                type="checkbox"
                                checked={isCheckedBrMa}
                                //value={diaLbrazosRuti}
                                onChange={() => setIsCheckedBrMa(!isCheckedBrMa)}
                                />
                            </div>  
                        </tr>
                        <tr>              
                            <div>
                                <label htmlFor="brazosXRuti">Miércoles: </label>
                                <input
                                type="checkbox"
                                checked={isCheckedBrMi}
                                //value={diaLbrazosRuti}
                                onChange={() => setIsCheckedBrMi(!isCheckedBrMi)}
                                />
                            </div>
                        </tr>
                        <tr>           
                            <div>
                                <label htmlFor="brazosJRuti">Jueves: </label>
                                <input
                                type="checkbox"
                                checked={isCheckedBrJu}
                                //value={diaLbrazosRuti}
                                onChange={() => setIsCheckedBrJu(!isCheckedBrJu)}
                                />
                            </div>
                        </tr>
                        <tr>           
                            <div>
                                <label htmlFor="troncoVRuti">Viernes: </label>
                                <input
                                type="checkbox"
                                checked={isCheckedBrVi}
                                //value={diaLbrazosRuti}
                                onChange={() => setIsCheckedBrVi(!isCheckedBrVi)}
                                />
                            </div>
                        </tr>
                    </td>
                    <td>
                        <tr>           
                            <label>Ejercicios de tronco:</label>
                            <div>
                                <label htmlFor="troncoLRuti">Lunes: </label>
                                <input
                                type="checkbox"
                                checked={isCheckedTrLu}
                                //value={diaLtroncoRuti}
                                onChange={() => setIsCheckedTrLu(!isCheckedTrLu)}
                                />
                            </div>
                        </tr>
                        <tr>           
                            <div>
                                <label htmlFor="troncoMRuti">Martes: </label>
                                <input
                                type="checkbox"
                                checked={isCheckedTrMa}
                                //value={diaLtroncoRuti}
                                onChange={() => setIsCheckedTrMa(!isCheckedTrMa)}
                                />
                            </div>            
                        </tr>
                        <tr>               
                            <div>
                                <label htmlFor="troncoXRuti">Miércoles: </label>
                                <input
                                type="checkbox"
                                checked={isCheckedTrMi}
                                //value={diaLtroncoRuti}
                                onChange={() => setIsCheckedTrMi(!isCheckedTrMi)}
                                />
                            </div>
                        </tr>
                        <tr>           
                            <div>
                                <label htmlFor="troncoJRuti">Jueves: </label>
                                <input
                                type="checkbox"
                                checked={isCheckedTrJu}
                                //value={diaLtroncoRuti}
                                onChange={() => setIsCheckedTrJu(!isCheckedTrJu)}
                                />
                            </div>
                        </tr>
                        <tr>           
                            <div>
                                <label htmlFor="troncoVRuti">Viernes: </label>
                                <input
                                type="checkbox"
                                checked={isCheckedTrVi}
                                //value={diaLtroncoRuti}
                                onChange={() => setIsCheckedTrVi(!isCheckedTrVi)}
                                />
                            </div>
                        </tr>
                    </td>           
                </table>
                <button className="btn btn-new" type="submit">Añadir rutina</button>
            </form>
            <button className="btn btn-neutro" onClick={handleCancelar}>Cancelar</button>
        
        </div>
    )

}
export default NewRutinaForm