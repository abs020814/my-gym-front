import { AuthProvider } from './AuthContext';
import Login from './Login'


function LoginWrapper () {
   
      return (
        <AuthProvider >
        <Login />
        </AuthProvider >

      );
}
export default LoginWrapper