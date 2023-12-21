import Dashboard from './Dashboard';
import Unknown from './Unknown';
import {useParams} from 'react-router-dom'; 
import {auth} from './config/firebase';
const Verify = () => {
    const {id} = useParams();
    console.log(auth?.currentUser)
    return ( 
    <div className="verify">
            {(id === 'lC8ATa3Q7BdbvYZBTDlgNH95Ww42') ? <Dashboard /> : <Unknown />}
    </div> );
}
 
export default Verify;