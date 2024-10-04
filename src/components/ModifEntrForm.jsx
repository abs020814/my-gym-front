
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';



const ModifEntrForm = ({setMostrarModifEntr, entrenador}) => {
    
    const { email , guardarTipoUsuario} = useContext(AuthContext);

    const [nombreEntr, setNombreEntr] = useState('');
    const [estudiosEntr, setEstudiosEntr] = useState('');
    const [tarifasEntr, setTarifasEntr] = useState('');
    const [ubicacionEntr, setUbicacionEntr] = useState('');
    const [especEntr, setEspecEntr] = useState('');
    
        
    useEffect(() => {
        if (entrenador) {
          setNombreEntr(entrenador.nombreEntr);
          setEstudiosEntr(entrenador.estudiosEntr);
          setTarifasEntr(entrenador.tarifasEntr);
          setUbicacionEntr(entrenador.ubicacionEntr);
          setEspecEntr(entrenador.especEntr);
        }
      }, [entrenador]);

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Creando el objeto con los datos que se van a enviar al servidor
        const formData = {
            nombreEntr: nombreEntr,
            estudiosEntr: estudiosEntr,
            tarifasEntr: tarifasEntr,
            ubicacionEntr: ubicacionEntr,
            fechaAltaEntr: new Date().toISOString(), // Fecha actual en formato ISO
            especEntr: especEntr,
            emailEntr: email,
            idEntr: entrenador.idEntr
        };

/*         if (!nombreEntr || !datosEntr || !especEntr ) {
            alert('Por favor, completa todos los campos');
            return;
        }
       */  

        console.log('Form dataaaa: ',JSON.stringify(formData));

        //send request post
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/entrenadores/', {
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

                guardarTipoUsuario("esEntrenador")
                setMostrarModifEntr(false)
            }
            //navigate("/cliente/profile");

        }catch (error) { console.error(error.message)}
    }
    ////

    
    const handleVolver = async () => {
        setMostrarModifEntr(false)
    }

    return (
        <div className="form-container">            
            <form method="post" onSubmit={handleSubmit}>
            <div className="form-div">
                    <p>(email) {email}</p>
                    <label htmlFor="nombreEntr" className="form-label">Nombre del Entrenador:</label>
                    <input className="form-input"
                    type="text"
                    id="nombreEntr"
                    value={nombreEntr}
                    required
                    onChange={(e) => setNombreEntr(e.target.value)}
                    />
                </div>
                <div className="form-div">
                    <label htmlFor="estudiosEntr" className="form-label">Estudios/formación como entrenador:</label>
                    <input className="form-input"
                    type="text"
                    id="estudiosEntr"
                    value={estudiosEntr}
                    required
                    onChange={(e) => setEstudiosEntr(e.target.value)}
                    />
                </div>
                <div className="form-div">
                    <label htmlFor="tarifasEntr" className="form-label">Tarifas: escribe un rango de precios</label>
                    <input className="form-input"
                    type="text"
                    id="tarifasEntr"
                    value={tarifasEntr}
                    required
                    onChange={(e) => setTarifasEntr(e.target.value)}
                    />
                </div>
                <div className="form-div">
                    <label htmlFor="ubicacionEntr" className="form-label">¿Desde dónde impartes tu formación?</label>
                    <input className="form-input"
                    type="text"
                    id="ubicacionEntr"
                    value={ubicacionEntr}
                    required
                    onChange={(e) => setUbicacionEntr(e.target.value)}
                    />
                </div> 
                <div className="form-div">
                    <label htmlFor="especEntr" className="form-label">Especialidad:</label>
                    <input className="form-input"
                    type="text"
                    id="especEntr"
                    value={especEntr}
                    required
                    onChange={(e) => setEspecEntr(e.target.value)}
                    />
                </div>
                <button className="btn btn-info" type="submit">Modificar</button>
            </form>
            <button className="btn btn-neutro" onClick={handleVolver}>Volver sin cambios</button>
        </div>
    )

}
export default ModifEntrForm