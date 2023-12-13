import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import {signInWithPopup, createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import {auth, googleAuthProvider} from './config/firebase';
const Signup = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(null);
    console.log(auth?.currentUser)
    const signup = async (e) => {
       e.preventDefault();
       try {
         await createUserWithEmailAndPassword(auth, email, password);
         navigate('/');
         setError(false);
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
    const signOutUser = async () => {
      try {
         await signOut(auth, googleAuthProvider);
         navigate('/');
      } catch (error) {
         setError(error);
      }
    }
    return ( 
    <div className="signup">
            <Navbar signOut={signOutUser}/>   
            <main className="signup-form">
             <form onSubmit={signup}>
               <h4>Signup</h4>
                <input type="email" placeholder=" Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button>Submit</button>
             </form>
             <p>Or</p>
                <button onClick={signupWithGoogle}>Sign up with Google</button>
                {error && <div style={{ padding: '20px', background: '#ffefef', border: '1px solid #e7195a', height: '100px', margin: '20px 0', borderRadius: '4px', color: '#e7195a' }}>{error.message}</div>}
            </main>
    </div> );
}
  
export default Signup;