import {useState, useEffect } from 'react'
import ArchiveEntrenador from './ArchiveEntrenador'

const PrincipalEntrenadores = () => {
    const [entrenadores, setEntrenadores] = useState([])

    useEffect(() => {
        const fetchEntrenadores = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL + '/entrenadores/')
                const data = await response.json()
                setEntrenadores(data)
            } catch (error) {console.error(error.message)}
        }

        fetchEntrenadores() 
    }, [])

    const handleEntrenadorDelete = (idEntr) => {
        setEntrenadores(entrenadores => entrenadores.filter(post => entrenadores.idEntr !== idEntr))
    }

    return (
        <section>
            {entrenadores.map(entrenador => (
                <ArchiveEntrenador key={entrenador.idEntr} entrenador={entrenador} onDelete={handleEntrenadorDelete}/>
            ))}
        </section> 
    )

}
export default PrincipalEntrenadores