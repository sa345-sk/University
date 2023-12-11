import { useState, useEffect } from 'react';
import {docRef} from './config/firebase';
import {getDocs, collection} from 'firebase/firestore';

const useFetch = () => {
    let [crimes, setCrimes] = useState(null);
    let [loading, setLoading] = useState(true);
    let [error, setError] = useState(null);
    let crimesCollection = collection(docRef, 'crimes');
    //This is the abort controller
    const abortCont = new AbortController();
    //This function gets the latest crimes reported
    async function getCrimes() {
      try {
        const crimes = await getDocs(crimesCollection, {signal: abortCont.signal});
        const filteredData = crimes.docs.map((doc) => ({...doc.data(), id: doc.id}))
        setCrimes(filteredData);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    useEffect(() => {
      getCrimes()
      return () => abortCont.abort();
    }, [crimes]);

    return {crimes, loading, error, crimesCollection, getCrimes};
}
 
export default useFetch;