import {Link} from 'react-router-dom';
import login from './assets/login.svg';
import handCuff from './assets/handcuff.svg';
const Navbar = () => {
    return ( 
        <div className="navbar">
            <div className="items">
                <div className="name">
                    <h1><Link to='/'><img src={handCuff} alt="handcuff" />Crime <span>Watch</span></Link></h1>
                </div>
                <div className="login">
                    <Link to="/login"><img src={login} alt="login" />Login</Link>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;