import Header from './Header.jsx'
import Footer from './Footer.jsx'
import NewRutinaForm from './NewRutinaForm.jsx'
import { AuthProvider } from './AuthContext';

const NewRutina = () => {
    return (
        <>
        <AuthProvider >        
            <Header />
            <NewRutinaForm />
            <Footer />
        </AuthProvider >
        </>
    )

}
export default NewRutina