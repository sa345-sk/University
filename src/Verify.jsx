import Dashboard from './Dashboard';
import Unknown from './Unknown';
import {useParams} from 'react-router-dom'; 
const Verify = () => {
    const {id} = useParams();
    return ( 
    <div className="verify">
            {(id === 'lC8ATa3Q7BdbvYZBTDlgNH95Ww42') ? <Dashboard /> : <Unknown />}
    </div> );
}
 
export default Verify;