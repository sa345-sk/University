import { useState, useRef } from "react";
import Navbar from "./Navbar";
import {auth} from './config/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate, Link} from 'react-router-dom';
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
        navigate(`/dashboard/${admin.user.uid}`);
        setError(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
  const refUser = useRef(null);
  const refAdmin = useRef(null);
  let [isCalled, setIsCaled] = useState(false);
  const switchAdminAndUser = () => {
    if (isCalled === false) {
      refAdmin.current.style.border = '0px solid rgb(3, 15, 77)';
      navigate('/userlogin')
      setIsCaled(true);
    } else if (isCalled === true) {
      refAdmin.current.style.border = '3px solid #1d3de3';
      refUser.current.style.border = '0px solid rgb(3, 15, 77)';
      setIsCaled(false);
      navigate('/login')
    }
  }
    return ( 
        <div className="login-page">
            <Navbar auth={auth?.currentUser}/>
            <div className="signupform">
            <main className="login-form">
                <form onSubmit={login}>
                    <h4>Admin Login</h4>
                    <input type="email" placeholder="Admin Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <input type="password" placeholder="Admin password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <button>Submit</button>
                </form>
            <Link to='/userlogin'><div className="role-user" ref={refUser} onClick={switchAdminAndUser}>User</div></Link>
            <Link to='/login'><div className="role-admin" ref={refAdmin} onClick={switchAdminAndUser} style={{ border: '3px solid #1d3de3' }}>Admin</div></Link>
              {error && <div style={{ padding: '20px', background: '#ffefef', border: '1px solid #e7195a', height: '100px', margin: '20px 0', borderRadius: '4px', color: '#e7195a'}}>{error.message}</div>}
            </main>
          </div>
        </div>
     );
}
 
export default Login;