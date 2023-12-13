import { useState } from "react";
import Navbar from "./Navbar";
import {auth} from './config/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const login = async (e) => {
     e.preventDefault();
     setLoading
      try {
        const admin = await signInWithEmailAndPassword(auth, email, password);
        console.log(admin.user.uid);
        navigate(`/dashboard/${admin.user.uid}`);
        setError(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    }
    return ( 
        <div className="login-page">
            <Navbar/>
            <main className="login-form">
                <form onSubmit={login}>
                    <h4>Login here</h4>
                    <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password" placeholder="Admin password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <button>Submit</button>
                </form>
              {error && <div style={{ padding: '20px', background: '#ffefef', border: '1px solid #e7195a', height: '100px', margin: '20px 0', borderRadius: '4px', color: '#e7195a'}}>{error.message}</div>}
            </main>
        </div>
     );
}
 
export default Login;