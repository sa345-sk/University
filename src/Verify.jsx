import Dashboard from './Dashboard';
import Unknown from './Unknown';
import {useParams} from 'react-router-dom'; 
const Verify = ({admin}) => {
    const {id} = useParams();
    console.log(id)
    //This is only for test it should not be id you should hard code the id
    // function adminID () {
    //     return admin === 'lC8ATa3Q7BdbvYZBTDlgNH95Ww42';
    // }
    return ( 
    <dv className="verify">
            {id === 'lC8ATa3Q7BdbvYZBTDlgNH95Ww42'? <Dashboard/> : <Unknown/>}
    </dv> );
}
 
export default Verify;