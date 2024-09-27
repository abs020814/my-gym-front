

import React, { useState, useEffect, useContext } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';


const EntrenadorCliente = () => {
  const navigate = useNavigate();
  //const location = useLocation();
  const { tipoUsuario, idEntr, idClie, guardarIdClie} = useContext(AuthContext);

  //const { idEntr, idClie } = location.state;
  const [cliente, setCliente] = useState(null);
  const [rutina, setRutina] = useState(null);
  const [plannutr, setPlannutr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   
  const [rutinasDisponibles, setRutinasDisponibles] = useState([]);
  const [planesDisponibles, setPlanesDisponibles] = useState([]);
  
  const fetchCliente = async (idClie) => {
    console.log("fetchCLiente...idClie: ",idClie)
    try {
      setLoading(true);
      const response = await fetch(process.env.REACT_APP_API_URL + '/clientes/idClie/?idClie=' + idClie);
      const data = await response.json();
      setCliente(data);
      // Si no tiene rutina o nutrición asignada, obtener las disponibles
      if (!data.idRutiClie) {
        const respRutinas = await fetch(process.env.REACT_APP_API_URL + `/rutinas/idEntrRuti/${idEntr}`)
        const dataRutinas = await respRutinas.json()

        setRutinasDisponibles(dataRutinas);
        setRutina(null);
        console.log("fetchandstorecli...rutinasdisponibles: ",rutinasDisponibles)
      } else {
        const respRutina = await fetch(process.env.REACT_APP_API_URL + `/rutinas/idRuti/${data.idRutiClie}`)
        const dataRutina = await respRutina.json()

        setRutina(dataRutina);
      }
      
      if (!data.idNutrClie) {
        const respPlanesNutr = await fetch(process.env.REACT_APP_API_URL + `/nutricion/idEntrNutr/${idEntr}`)
        const dataPlanesNutr = await respPlanesNutr.json()

        setPlanesDisponibles(dataPlanesNutr);
        setPlannutr(null);
        //console.log("fetchandstorecli...planesdisponibles: ",planesDisponibles)
      } else {
        const respPlannutr = await fetch(process.env.REACT_APP_API_URL + `/nutricion/idNutr/${data.idNutrClie}`)
        const dataPlannutr = await respPlannutr.json()

        setPlannutr(dataPlannutr);
      }
     
      setLoading(false)
       } catch (error) {
      // ...
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idClie) {
      fetchCliente(idClie);
    }
  }, [idClie, idEntr]);

  useEffect(() => {
    //console.log("entrCli.useEf..rutina: ",rutina)
  }, [rutina]);

  useEffect(() => {
    //console.log("entrCli.useEf..plannutr: ",plannutr)
  }, [plannutr]);

  // Función para asignar una rutina o plan de nutrición
  const asignarRutina = async ( idRutiClie) => {
    // Confirmación (implementa un modal o alert)
    if (window.confirm(`¿Deseas asignar la rutina con ID ${idRutiClie} a este cliente?`)) {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/clientes/${idClie}/asignRuti?idRutiClie=${idRutiClie}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // Actualizar el estado del cliente
        fetchCliente(idClie);
      } catch (error) {
        //console.error(error);
      }
    }
  };  // Función para asignar una rutina o plan de nutrición

  const asignarPlan = async ( idNutrClie) => {
    // Confirmación (implementa un modal o alert)
    if (window.confirm(`¿Deseas asignar el plan con ID ${idNutrClie} a este cliente?`)) {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + `/clientes/${idClie}/asignNutr?idNutrClie=${idNutrClie}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // Actualizar el estado del cliente
        fetchCliente(idClie);
      } catch (error) {
        //console.error(error);
      }
    }
  };

  const handleClickVolver = async () => {
      guardarIdClie(0);

  }

  const handleClickCambiarRutina = async () => {
    /*
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + `/clientes/${idClie}/asignRuti?idRutiClie=0`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });      
      // Actualizar el estado del cliente
      fetchCliente();
    } catch (error) {
      //console.error(error.message)
    }
      */
    const respRutinas = await fetch(process.env.REACT_APP_API_URL + `/rutinas/idEntrRuti/${idEntr}`)
    const dataRutinas = await respRutinas.json()

    setRutinasDisponibles(dataRutinas);
    setRutina(null)
  }

  const handleClickCambiarPlan = async () => {
    /* try {
      const response = await fetch(process.env.REACT_APP_API_URL + `/clientes/${idClie}/asignNutr?idNutrClie=0`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });      
      // Actualizar el estado del cliente
      fetchCliente();
    } catch (error) {
      //console.error(error.message)
    } */
    const respPlanesNutr = await fetch(process.env.REACT_APP_API_URL + `/nutricion/idEntrNutr/${idEntr}`)
    const dataPlanesNutr = await respPlanesNutr.json()

    setPlanesDisponibles(dataPlanesNutr);
    setPlannutr(null)
  }

  const [hoveredItemRuti, setHoveredItemRuti] = useState(null);
  const [hoveredItemNutr, setHoveredItemNutr] = useState(null);

  const handleMouseEnterRuti = (rutina) => {
    setHoveredItemRuti(rutina.idRuti);
  };

  const handleMouseLeaveRuti = () => {
    setHoveredItemRuti(null);   

  };
  const handleMouseEnterNutr = (plannutr) => {
    setHoveredItemNutr(plannutr.idNutr);
  };

  const handleMouseLeaveNutr = () => {
    setHoveredItemNutr(null);   

  };

  // Mostrar carga o error
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>

  return (
    <div> 
      {cliente && (
          <>
            {/* Mostrar datos del cliente */}
            <h3>Datos de tu cliente: (id.{cliente.idClie})</h3>
            <p>Nombre: {cliente.nombreClie}</p>
            <p>objetivos: {cliente.objetivosClie}</p>
            <p>Fecha objetivo: {cliente.fecObjetivoClie}</p>
            <p>Peso: {cliente.pesoClie}</p>

            {/* Mostrar rutina o listado de rutinas */}
            {rutina ? (
              <>
              <p>Rutina asignada: {rutina.descrRuti}
              <button className="btn btn-info" onClick={handleClickCambiarRutina}>Cambiar...</button>
              </p>
              </>
            ) : (
              <p>Elige la rutina que quieras asignar:
              <ul>
                {rutinasDisponibles && rutinasDisponibles.length > 0 ? ( 
                rutinasDisponibles.map( rutina => (                
                  <li key={rutina.idRuti} 
                    onMouseEnter={() => handleMouseEnterRuti(rutina)}
                    onMouseLeave={handleMouseLeaveRuti}
                    style={{
                    cursor: 'pointer',
                    backgroundColor: hoveredItemRuti ===rutina.idRuti ? 'lightblue' : 'white'                        
                    }}
                    onClick={() => asignarRutina(rutina.idRuti)}>
                    {rutina.descrRuti}
                  </li>
                ))) : (
                  <p> (sin rutinas disponibles) </p>
                )}
              </ul>
              </p>
            )}





            {/* Mostrar plan de nutrición o listado */}
            {plannutr ? (
              <>
              <p>Plan asignado: {plannutr.descrNutr}
              <button className="btn btn-info" onClick={handleClickCambiarPlan}>Cambiar...</button>
              </p>
              </>
            ) : (
              <p>Elige el plan que quieras asignar:
              <ul>
                {planesDisponibles && planesDisponibles.length > 0 ? ( 
                planesDisponibles.map( plannutr => (                
                  <li key={plannutr.idNutr} 
                    onMouseEnter={() => handleMouseEnterNutr(plannutr)}
                    onMouseLeave={handleMouseLeaveNutr}
                    style={{
                    cursor: 'pointer',
                    backgroundColor: hoveredItemNutr ===plannutr.idNutr ? 'lightblue' : 'white'                        
                    }}
                    onClick={() => asignarPlan(plannutr.idNutr)}>
                    {plannutr.descrNutr}
                  </li>
                ))) : (
                  <p> (sin planes nutr. disponibles) </p>
                )}
              </ul>
              </p>
            )}

            <p>
            <button className="btn btn-neutro" onClick={handleClickVolver}>Cerrar detalle cliente</button>
            </p>
          </>
        )}
        {!cliente && (
        <p>Cargando datos del cliente...</p>
        )}
    </div>
   
  );
};

export default EntrenadorCliente;