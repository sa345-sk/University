import {useRef, useState } from "react";
import Navbar from "./Navbar";
import {auth, googleAuthProvider} from './config/firebase';
import {signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {useNavigate, Link} from 'react-router-dom';
const UserLogin = () => {
    const [error, setError] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const login = async (e) => {
        e.preventDefault();
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
            setError(error);
        }
    }
    const refUser = useRef(null);
    const refAdmin = useRef(null);
    let [isCalled, setIsCaled] = useState(false);
    const switchAdminAndUser = () => {
        if (isCalled === false) {
            console.log(refUser.current.style.border = '3px solid #1d3de3');
            refAdmin.current.style.border = '0px solid rgb(3, 15, 77)'
            setIsCaled(true);
        } else if (isCalled === true) {
        refAdmin.current.style.border = '3px solid #1d3de3';
        refUser.current.style.border = '0px solid rgb(3, 15, 77)';
        setIsCaled(false);
        }
    }
    return ( 
    <div className="user-login">
     <Navbar auth={auth?.currentUser}/>
     <div className="signupform">
                <main className="user-form">
                <form onSubmit={login}>
                    <h4>Login here</h4>
                    <input type="email" placeholder=" Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}  required />
                    <button>Submit</button>
                </form>
                <button onClick={signupWithGoogle}>Continue With Google</button>
                    <Link to='/userlogin'><div className="role-user" ref={refUser} onClick={switchAdminAndUser} style={{ border: '3px solid #1d3de3' }}>User</div></Link>
                    <Link to='/login'><div className="role-admin" ref={refAdmin} onClick={switchAdminAndUser}>Admin</div></Link>
            {error && <div style={{ padding: '20px', background: '#ffefef', border: '1px solid #e7195a', height: '100px', margin: '20px 0', borderRadius: '4px', color: '#e7195a' }}>{error.message}</div>}
            </main>
     </div>
    </div> 
    );
}
export default UserLogin;