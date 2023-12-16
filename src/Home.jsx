import Navbar from './Navbar';
import ReportForm from './ReportFrom';
import {auth} from './config/firebase';
const Home = () => {
    console.log(auth?.currentUser);
    return ( 
    <div className="home">
        <Navbar user={auth?.currentUser}/>
        <div className="details">
        <div className="intro">
            <h2>Online Crime Record Management System</h2>
            <p>The fastest way yo report an on going crime <br/>within Gombe state university.</p>
            <div className="info-report">
                <div className="info">
                    <h3>How the system works</h3>
                    <p>Report an on going crime by filling out the form. Our system will notify school security and they will contact you if necessary. <br/>You will receive an invitation email to provide evidence.</p>
                </div>
                <ReportForm />
                        <div className='note'>Note: If you have more than one file, kindly zip them into one archive and upload.</div>
            </div>
        </div>
        </div>
    </div> );
}
 
export default Home;