import { AuthProvider } from './AuthContext';
import Header from './Header'
import Main from './Main'
import Footer from './Footer.jsx'


const Home = () => {
    
    return (
        <AuthProvider >
          <Header />
          <Main />
          <Footer />
        </AuthProvider>
      )
}
export default Home


