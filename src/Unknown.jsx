import { Link } from "react-router-dom";
//fof stands for 404
const Unknown = () => {
    return ( 
    <div className="unknown">
        <div className="fof" style={{width: '71rem', margin: '0 auto'}}>
            <h1>Oops! sorry the page you are looking for do not exist. Click on the link below to take you to our homepage.</h1>
            <Link to='/' style={{ textAlign: 'center', color: 'rgb(3, 15, 77)', textDecoration: 'underline'}}>Homepage</Link>
        </div>
    </div> );
}
 
export default Unknown;