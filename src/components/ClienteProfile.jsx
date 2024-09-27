

import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import ModifClientForm from './ModifClientForm';

const ClienteProfile = ( {setMostrarAlta}) => {
  // const navigate = useNavigate();  // Hook para la navegación
  // const location = useLocation();  // Hook para obtener la ubicación y el state
  const [rutina, setRutina] = useState(null);
  const [nutricion, setNutricion] = useState(null);
  const [ entrenador, setEntrenador] = useState(null);
  const { email ,guardarTipoUsuario } = useContext(AuthContext);
  const [dataClie, setDataClie] = useState(null);
  const [mostrarModifClie, setMostrarModifClie] = useState(null);

  const fetchClie = async () => {
    console.log("en cli.prof...email:",email)

    try {
      const responseClie = await fetch(process.env.REACT_APP_API_URL + `/clientes/emailClie?emailClie=${email}`)
      
      if (!responseClie.ok) {
        throw new Error(`Error: ${responseClie.status}`);
      }
      setDataClie( await responseClie.json() )
    } 
    catch (error) {console.error(error.message)}
  }

  const fetchRestoDatos = async () => {
    if (dataClie && dataClie.idRutiClie) {
      try {
          const respRutina = await fetch(process.env.REACT_APP_API_URL + `/rutinas/idRuti/${dataClie.idRutiClie}`)
          const dataRutina = await respRutina.json()
          console.log("cliProfile...dataRutina: ",dataRutina);
          setRutina(dataRutina);
        }
      catch (error) {
        console.error(error);
      }
    }
    if (dataClie && dataClie.idNutrClie) {
      try {
          const respNutricion = await fetch(process.env.REACT_APP_API_URL + `/rutinas/idRuti/${dataClie.idRutiClie}`)
          const dataNutricion = await respNutricion.json()
          console.log("cliProfile...dataNutricion: ",dataNutricion);
          setNutricion(dataNutricion);
        }
      catch (error) {
        console.error(error);
      }
    }
    if (dataClie && dataClie.idEntrClie) {
      try {
        const respEntr = await fetch(process.env.REACT_APP_API_URL + `/entrenadores/idEntr/${dataClie.idEntrClie}`)
        const dataEntr = await respEntr.json()
        console.log("cliProfile...dataEntr: ",dataEntr);

        setEntrenador(dataEntr);
      }
      catch (error) {
        console.error(error);
      }
    }
  };

  const handleCambiarDatos = async () => {
    setMostrarModifClie("modifCli");
  }

  const handleDelete = async () => {
    const confirmacion = window.confirm("Estimado cliente, ¿estás seguro de que deseas darte de baja?");
  
    if (confirmacion) {
      try {
          const response = await fetch(process.env.REACT_APP_API_URL + '/clientes/' + dataClie.idClie  , {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          if (!response.ok) {
              console.error('Response was not OK')
          }

          alert('¡Hasta pronto!')

          guardarTipoUsuario("noRegistrado")
          setMostrarAlta(false)

      } catch (error) { console.error(error.message)}
    } else {
        // click en cancelar
    }
  }

  useEffect( () => {
    fetchClie();
  }, [mostrarModifClie]);

  useEffect( () => {
    fetchRestoDatos();
  }, [dataClie]);


    return (
      <div className="clienteClass" >
        <div>
            {dataClie && (
              <>
                {mostrarModifClie && mostrarModifClie.includes('modifCli') && (
                    <ModifClientForm setMostrarModifClie={setMostrarModifClie} cliente={dataClie}/>
                )}
                {!mostrarModifClie && (
                  <>
                      <h1>Bienvenido {dataClie.nombreClie} (id.{dataClie.idClie})</h1>
                      <h2>Esta es tu ficha de cliente:</h2>
                      <p>Email: {email}</p>
                      <p>Fecha de inscripción: {dataClie.fecAltaClie}</p>
                      <table className="detalleCliente">
                        <td>
                          <p>Peso: {dataClie.pesoClie}</p>
                          <p>Objetivos: {dataClie.objetivosClie}</p>
                          <p>Fecha objetivos: {dataClie.fecObjetivoClie}</p>
                        </td >
                        <td><button className="btn btn-info" onClick={handleCambiarDatos}>Cambiar algún dato</button>
                        </td>
                        <td> {entrenador ? (
                        <>Entrenador elegido: {entrenador.nombreEntr} </>
                        ) : ( <p className="avisoSinAlgo">(A falta de elegir entrenador. Click en modificar y selecciona uno)</p>)}
                        </td>                        
                      </table>
                      
                      <p> {rutina ? (
                        <>Rutina asignada: (id.{dataClie.idRutiClie}) {rutina.descrRuti} </>
                      ) : ( <p className="avisoSinAlgo">(Sin rutina asignada. Espera a que tu entrenador te la asigne)</p>)}
                      </p>
                      <p> {nutricion ? (
                        <>Plan nutrición asignado: (id.{dataClie.idNutrClie}) {nutricion.descrRuti} </>
                      ) : ( <p className="avisoSinAlgo">(Sin plan de nutrición asignado. Espera a que tu entrenador te lo asigne)</p>)}
                      </p>
                      <button className="btn btn-danger" onClick={handleDelete}>Darse de baja como cliente  </button>                  
                  </>
                )}
              </>
            )}
            {/* Si tipoUsuario no es una cadena, puedes mostrar un mensaje de error o un componente de carga */}
            {!dataClie && <p>Cargando cliente...</p>}
         </div>
      </div>
    );
  };
export default ClienteProfile