import {Link} from 'react-router-dom';
import handCuff from './assets/handcuff.svg';
const Navbar = ({ signOut, auth }) => {
    return ( 
        <div className="navbar">
            <div className="items">
                <div className="name">
                    <h1><Link to='/'><img src={handCuff} alt="handcuff" />Crime <span>Watch</span></Link></h1>
                </div>
                <div className="login">
                    {auth === null ? <Link to='/signup'>Signup</Link> : <Link to='/'  onClick={signOut}>Logout</Link>}
                    <Link to='/userLogin'>Login</Link>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;