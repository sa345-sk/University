import { useState } from "react";
import Navbar from "./Navbar";
import {auth} from './config/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const login = async (e) => {
     e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('sucess');
        navigate('/dashboard')
      } catch (error) {
        console.log(error);
      }
    }
    return ( 
        <div className="login-page">
            <Navbar/>
            <main className="login-form">
                <form onSubmit={login}>
                    <h4>Login here</h4>
                    <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="Admin password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button>Submit</button>
                </form>
            </main>
        </div>
     );
}
 
export default Login;