import './App.css';
import './assets/css/App.sass'
import Home from './components/Home'
import NewClient from './components/NewClient'
import NewRutina from './components/NewRutina'
import LoginWrapper from './components/LoginWrapper'
import EntrenadorProfile from './components/EntrenadorProfile'
import ClienteProfile from './components/ClienteProfile'
import NewNutricion from './components/NewNutricion';
import { Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <Routes>
      <Route path="/" element={ <Home />} />

      <Route path="/new-client" element={ <NewClient />} />
      <Route path="/login" element={ <LoginWrapper />} />
      <Route path="/entrenador/profile" element={ <EntrenadorProfile />} />
      <Route path="/cliente/profile" element={ <ClienteProfile />} />
      <Route path="/nueva-rutina" element={<NewRutina />} />
      <Route path="/nuevo-plan" element={<NewNutricion />} />


    </Routes>
  );
}

export default App;
