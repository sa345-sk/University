import {docRef} from './config/firebase';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import View from './View';
import {doc, getDoc} from 'firebase/firestore';
const Check = () => {
   const {id} = useParams();
   const co = doc(docRef, 'crimes', id);
   const [crime, setCrime] = useState();
   const [error, setError] = useState();
   const [loading, setLoading] = useState(true);
   useEffect(() => {
   const getSingle = async () => {
         try {
            const crime = await getDoc(co);
            setCrime(crime.data(), crime.id); 
            setError(false);
            setLoading(false);
         } catch (error) {
            setError(error);
            setLoading(false);
         }
      }
      getSingle();
   }, []);
   return ( 
      <div className="check">
          {crime && <View crime={crime} id={id}/>}
         {loading && <div style={{ color: 'rgb(3, 15, 77)', marginLeft: '37rem', marginTop: '20rem' }}>Loading....</div>}
         {error && <div style={{marginLeft: '37rem', marginTop: '20rem'}}>{error.message}</div>}
      </div>
    );
}
 
export default Check;