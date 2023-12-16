import { useState } from "react";
import Navbar from "./Navbar";
import {auth, googleAuthProvider} from './config/firebase';
import {signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
const UserLogin = () => {
    const [error, setError] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password); 
            navigate('/');
        } catch (error) {
            setError(error);
        }
    }
    const signupWithGoogle = async () => {
        //This signup with Google
        try {
            await signInWithPopup(auth, googleAuthProvider);
            navigate('/');
        } catch (error) {
            console.log(error);
            setError(error);
        }
    }
    return ( 
    <div className="user-login">
     <Navbar/>
     <div className="signupform">
                <main className="user-form">
                <form onSubmit={login}>
                    <h4>Login</h4>
                    <input type="email" placeholder=" Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button>Submit</button>
                </form>
                <button onClick={signupWithGoogle}>Continue With Google</button>
            {error && <div style={{ padding: '20px', background: '#ffefef', border: '1px solid #e7195a', height: '100px', margin: '20px 0', borderRadius: '4px', color: '#e7195a' }}>{error.message}</div>}
            </main>
     </div>
    </div> 
    );
}
export default UserLogin;