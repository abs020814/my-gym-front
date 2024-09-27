
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import AuthContext from './AuthContext';
import EntrenadorCliente from './EntrenadorCliente';
import NewRutinaForm from './NewRutinaForm';
import NewNutricionForm from './NewNutricionForm';
import ModifEntrForm from './ModifEntrForm';

const EntrenadorProfile = ( {setMostrarAlta} ) => {
    const navigate = useNavigate();  // Hook para la navegación
    //console.log("en Entr...:", location.state)
    //const { nombreEntr, idEntr, fechaAltaEntr, especEntr, datosEntr, emailEntr,  } = location.state;
    const { email , guardarTipoUsuario, guardarIdEntr, guardarIdClie, idClie} = useContext(AuthContext);
    const [ dataEntr, setDataEntr ] = useState(null);
    /* para la lista de clietnes asignados */
    const [clientes, setClientes] = useState([]);
    const [rutinas, setRutinas] = useState([]);
    const [nutricions, setNutricions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setId] = useState(null); // El valor devuelto por el servidor (puede ser null o un ID)
    const [mostrarRutinas, setMostrarRutinas] = useState(false); // Para mostrar/ocultar la lista de opciones)
    const [mostrarNutricions, setMostrarNutricions] = useState(false); // Para mostrar/ocultar la lista de opciones)
    const [mostrarAltaRP, setMostrarAltaRP] = useState(null);
    const [mostrarModifEntr, setMostrarModifEntr] = useState(null);


    // Función para manejar la selección de una opción
    const manejarSeleccionRutinas = (idRuti) => {
      setId(idRuti); // Aquí seteamos el id basado en la opción seleccionada
      //console.log(id);
      setMostrarRutinas(false); // Ocultamos las opciones después de seleccionar
    };
    const manejarSeleccionNutricions = (idRuti) => {
      //setIdNutr(idNutr); // Aquí seteamos el id basado en la opción seleccionada
      //console.log(id);
      setMostrarNutricions(false); // Ocultamos las opciones después de seleccionar
    };

    const handleDelete = async () => {
      const confirmacion = window.confirm("Entrenador, ¿estás seguro de que deseas darte de baja?");

      if (confirmacion) {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/entrenadores/' + dataEntr.idEntr  , {
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

      }
    }
    /*
    useEffect( () => {
      fetchEntr();
    }, []);
    */
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        // Si no hay token, redirigir al login o página principal
        navigate('/');
      }
    }, [navigate]);
  
  
    const fetchData = async () => {
        try {
          setLoading(true);
  
          // Obtener datos del entrenador
          const responseEntr = await fetch(process.env.REACT_APP_API_URL + `/entrenadores/emailEntr?emailEntr=${email}`);
          const dataEntr = await responseEntr.json();
          setDataEntr(dataEntr);
          guardarIdEntr(dataEntr.idEntr);
  
          // Obtener clientes asignados
          const responseClientes = await fetch(process.env.REACT_APP_API_URL + '/clientes/idEntrClie/?idEntrClie=' + dataEntr.idEntr);
          const clientes = await responseClientes.json();
          setClientes(clientes);
  
          // Obtener rutinas creadas
          const responseRutinas = await fetch(process.env.REACT_APP_API_URL + '/rutinas/idEntrRuti/' + dataEntr.idEntr);
          //const rutinas = await responseRutinas.json();
          setRutinas(await responseRutinas.json());
          console.log("infetchdata...setruti: ",setRutinas)
          // Obtener planes nutr creadas
          const responseNutricions = await fetch(process.env.REACT_APP_API_URL + '/nutricion/idEntrNutr/' + dataEntr.idEntr);
          setNutricions(await responseNutricions.json());
  
          setLoading(false);
        } catch (error) {
          console.error(error);
          setError('Error al cargar los datos');
          setLoading(false);
        }
      };
     

      useEffect( () => {
        fetchData();
      }, [email]);
   
      useEffect( () => {
        fetchData();
      }, [setNutricions]);
   
      useEffect( () => {
        fetchData();
      }, [setRutinas]);
     
      useEffect( () => {
        fetchData();
      }, [mostrarModifEntr]);
    
    const handleClickRuti = () => {
      setMostrarAltaRP("altaRutina");
    };
    const handleClickNutr = () => {
      setMostrarAltaRP("altaPlan");
    };

    const handleClickDetCli = (idClie) => {
      guardarIdClie(idClie);
      //navigate('/entrenador/cliente');
    }

    const handleClickBorrarNutr = async (idNutr) => {
      const confirmacion = window.confirm("¿Confirmas que borras este plan de nutrició ? Los clientes que lo tuvieran quedarán sin ninguno asignado");

      if (confirmacion) {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/nutricion/' + idNutr , {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                console.error('Response was not OK')
            }

            alert('Plan Borrado')
          }
        catch (e) {
            console.log("Error borrando plan: ",e)
        }
        setNutricions(nutricions.filter((r) => r.idNutr !== idNutr));
      }
        
    }
    const handleClickBorrarRuti = async (idRuti) => {
      const confirmacion = window.confirm("¿Confirmas que borras esta rutina? Los clientes que la tuvieran quedarán sin ninguna asignada");

      if (confirmacion) {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/rutinas/' + idRuti  , {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                console.error('Response was not OK')
            }

            alert('Rutina Borrada')
          }
        catch (e) {
            console.log("Error borrando rutina: ",e)
        }
        setRutinas(rutinas.filter((r) => r.idRuti !== idRuti));
      }         

    }

    const handleCambiarDatos = async () => {
        setMostrarModifEntr("modifEntr");
        }

    // Mostrar carga o error
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    console.log("clientes devueltos..: ", clientes)
    return (
      <>
        {mostrarModifEntr && mostrarModifEntr.includes('modifEntr') && (
                <ModifEntrForm setMostrarModifEntr={setMostrarModifEntr} entrenador={dataEntr}/>
        )}
        {!mostrarModifEntr && (
                <div className="entrenadorClass">
                <h1>Bienvenido, {dataEntr.nombreEntr} (id.{dataEntr.idEntr})</h1>
                <h2>Estos son tus datos:</h2>
                <p>Datos: {dataEntr.datosEntr}</p>
                <p>Fecha de alta: {dataEntr.fechaAltaEntr}</p>
                
                <p>Especialidad: {dataEntr.especEntr}</p> 
                <button className="btn btn-info" onClick={handleCambiarDatos}>Cambiar algún dato</button>

                <p>E-Mail: {email}</p>
                <div>
                {idClie ? ( 
                  <div className="clientesClass">
                  <EntrenadorCliente />
                  </div>
                ) : ( 
                  <div className="clientesClass">
                  <h3>Clientes Asignados</h3>
                  <ul>
                    {clientes && clientes.length > 0 ? (

                      clientes.map((cliente) => (
                      <section key={cliente.idClie}>
                        <tbody>
                          <tr>
                            <td>
                              <h3>{cliente.nombreClie}</h3>
                            </td>
                            <td>
                              <p>Fecha de Alta: {cliente.fecAltaClie}</p>
                            </td>
                            <td>
                              <p>Peso: {cliente.pesoClie}</p>
                            </td>
                            <td>
                              <p>Email: {cliente.emailClie}</p>
                            </td>
                            <td>
                              <button className="btn btn-info" onClick={() => handleClickDetCli(cliente.idClie)}>Detalle del cliente. . . </button>
                            </td>
                          </tr>
                        </tbody>
                      </section>
                    ))) : (
                      <p>(No tienes clientes asignados)</p>
                    )}
                  </ul>
                  </div>
                )}
                </div>
                <div className="rutinasClass">
                  <h3>Rutinas gestionadas:</h3>
                  <ul>
                    {rutinas && rutinas.length > 0 ? (
                      rutinas.map((rutina) => (
                        <section key={rutina.idRuti}>
                          <tbody>
                            <tr>
                              <td>
                                <h3>{rutina.descrRuti}</h3>
                              </td>
                              <td>
                                <p>Fecha de Alta: {rutina.fechaAltaRuti}</p>
                              </td>
                              <td>
                                <button className="btn btn-danger" onClick={() => handleClickBorrarRuti(rutina.idRuti)}>Borrar esta rutina</button>
                              </td>
                            </tr>
                          </tbody>
                        </section>
                    ))) : (
                      <p>(No hay rutinas creadas)</p>
                    )}
                    {!mostrarAltaRP && (
                    <button className="btn btn-new" onClick={handleClickRuti}>Nueva rutina</button>
                    )}
                    {mostrarAltaRP && mostrarAltaRP.includes("altaRutina") && (
                      <NewRutinaForm setMostrarAltaRP={setMostrarAltaRP} setRutinas={setRutinas}/>
                    )}
                  </ul>
                </div>
                <div className="nutricionClass">
                  <h3>Planes de nutrición gestionados:</h3>
                  <ul>
                    {nutricions && nutricions.length > 0 ? (
                      nutricions.map((nutricion) => (
                        <section key={nutricion.idNutr}>
                          <tbody>
                            <tr>
                              <td>
                                <h3>{nutricion.descrNutr}</h3>
                              </td>
                              <td>
                                <p>Fecha de Alta: {nutricion.fechaAltaNutr}</p>
                              </td>
                              <td>
                                <button className="btn btn-danger" onClick={() => handleClickBorrarNutr(nutricion.idNutr)}>Borrar este plan</button>
                              </td>
                            </tr>
                          </tbody>
                        </section>
                    ))) : (
                      <p>(No hay planes de nutrición creados)</p>
                    )}
                    {!mostrarAltaRP && (
                    <button className="btn btn-new" onClick={handleClickNutr}>Nuevo Plan Nutri</button>
                    )}
                    {mostrarAltaRP && mostrarAltaRP.includes("altaPlan") && (
                      <NewNutricionForm setMostrarAltaRP={setMostrarAltaRP} setNutricions={setNutricions}/>
                    )}
                  </ul>
                </div>
                <button className="btn btn-danger" onClick={handleDelete}>Darse de baja como entrenador</button>
                </div>
        )}
      </>
    );
  };
export default EntrenadorProfile 