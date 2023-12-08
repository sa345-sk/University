import { addDoc } from 'firebase/firestore';
import useFirebase from './useFirebase';
import { useState } from 'react';
const ReportForm = () => {
    const {crimesCollection, getCrimes, error} = useFirebase();
    const [loading, setLoading] = useState(false);
    const [email, settEmail] = useState();
    const [crimeType, setCrimeType] = useState();
    const [date, setDate] = useState();
    const [body, setBody] = useState();
    const [file, setFile] = useState();
    const [adminComment, setAdminComment] = useState('');
    const [crimeLocation, setCrimeLocation] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(crimesCollection,{email, crimeType, crimeLocation, body, date, adminComment})
            alert('Complaint lodged successfully, you will be contacted if necessary.');
            getCrimes();
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert('Failed')
            setLoading(false);
        }
     };
    return ( 
    <div className="report-form">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <h4>Report a crime</h4>
                    <input type="email" placeholder="Email here" required value={email} onChange={(e) => settEmail(e.target.value)}/>
                    <input type="text" placeholder="Crime type" required value={crimeType} onChange={(e) => setCrimeType(e.target.value)}/>
                    <input type="text" placeholder="Crime location" required value={crimeLocation} onChange={(e) => setCrimeLocation(e.target.value)}/>
                    <textarea placeholder="What happens?" required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                    <input type="date" required value={date} onChange={(e) => setDate(e.target.value)}/>
                    <input type="file" value={file} />
                    {!loading && <button >Submit</button>}
                    {loading && <button>Submitng report....</button>}
                </form>
                {error && <div>{error.message}</div>}
            </div>
    </div> 
    );
}
 
export default ReportForm;