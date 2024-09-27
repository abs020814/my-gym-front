import Header from './Header.jsx'
import Footer from './Footer.jsx'
import NewNutricionForm from './NewNutricionForm.jsx'
import { AuthProvider } from './AuthContext.jsx';

const NewNutricion = () => {
    return (
        <>
        <AuthProvider >        
            <Header />
            <NewNutricionForm />
            <Footer />
        </AuthProvider >
        </>
    )

}
export default NewNutricion