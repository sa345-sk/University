import {Link, useNavigate} from 'react-router-dom';
import account from './assets/account.svg';
import note from './assets/note.svg';
import message from './assets/message.svg';
import tick from './assets/tick.svg';
import loading from './assets/loading.svg';
import key from './assets/key.svg';
import guage from './assets/guage.svg';
import handcuff from './assets/handcuff.svg';
import useFetch from './useFirebase';
import {signOut} from 'firebase/auth';
import {auth} from './config/firebase';
const Dashboard = () => {
   const navigate = useNavigate();
   const logOut = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('Failed to fetch!')
    }
   }
   const { crimes, error, loading: wait} = useFetch();
   console.log(crimes)
    return ( 
    <div className="dashboard">
          <div className="second-nav">
             <h4>Dashboard</h4>
             <form>
                <input type="text" placeholder='Search Crime ID... ' />
             </form>
             {/* <img src={account} alt="account" /> */}
             <div style={{marginRight: '10px', cursor: 'pointer'}} onClick={logOut}> Logout</div>
          </div>
       <div className="sidebar">
             <h3><img src={handcuff} alt="handcuff" />Crime Watch</h3>
         <div className="links">
                <Link><div id='dashboard'><img src={guage} alt="" />Dashboard</div></Link>
                <Link><div id='new'><img src={note} alt="" />New cases</div></Link>
                <Link><div id='resolved'><img src={tick} alt="" />Resolved cases</div></Link>
                <Link><div id='unresolved'><img src={loading} alt="" />Unresolved cases</div></Link>
                <Link><div id='message'><img src={message} alt="" />Messages</div></Link>
                <Link><div id='password'><img src={key} alt="" />Change Password</div></Link>
         </div>
       </div>
       <div className="contents">
         <section className="cases">
            <div className="total-cases">
               <p className='nums'>0</p>
               <span className='case'>Total Cases</span>
            </div>
            <div className="new-cases">
               <p className='nums'>0</p>
               <span className='case'>New cases</span>
            </div>
            <div className="resolved-cases">
               <p className='nums'>0</p>
               <span className='case'>Resolved Cases</span>
            </div>
            <div className="unresolved-cases">
               <p className='nums'>0</p>
               <span className='case'>Unresolved Cases</span>
            </div>
         </section>
                <div className="table">
                  <h3 style={{paddingBottom: '10px'}}>Reported Crimes</h3>
                  <main className="headers">
                     <h4>S/N</h4>
                     <h4>Crime Type</h4>
                     <h4>Date</h4>
                     <h4>Status</h4>
                     <h4>View Details</h4>
                  </main>
                {wait && <div style={{ color: 'rgb(3, 15, 77)'}}>Loading....</div>}
                   {crimes && crimes.map((crime, index) => (
                     <div key={crime.id} id='data'>
                        <p className='cell'>{index+1}</p>
                        <h5 className='cell' style={{paddingLeft: '5px'}}>{crime.crimeType}</h5>
                        <p className='cell' style={{paddingLeft: '40px'}}>{crime.date}</p>
                         <div  className='cell'style={{ background: 'rgba(234, 26, 241, 0.4)', border: '1px solid #a92cad', borderRadius: '10px 10px 10px 10px', textAlign: 'center', color: '#3f0e40', marginBottom: '2px', marginTop: '2px'}}>Pending</div>
                         <Link className='cell' to={`/details/${crime.id}`}><button style={{ border: '0', background: '#d7006f', width: '80px', height: '26px', borderRadius: '10px 10px 10px 10px', cursor: 'pointer', marginLeft: '60px', marginBottom: '2px', marginTop: '2px'}}>View Details</button></Link>
                     </div>
                   ))}
                {error && <div>OOPSIE!!!</div>}
             </div>
       </div>
    </div> 
    );
}
 
export default Dashboard;