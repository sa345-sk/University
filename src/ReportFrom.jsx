import { addDoc } from 'firebase/firestore';
import useFirebase from './useFirebase';
import { useRef, useState } from 'react';
const ReportForm = () => {
    const {crimesCollection, getCrimes} = useFirebase();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const [crimeType, setCrimeType] = useState();
    const [date, setDate] = useState();
    const [body, setBody] = useState();
    const [file, setFile] = useState();
    const [adminComment, setAdminComment] = useState('');
    const [crimeLocation, setCrimeLocation] = useState('');
    const [error, setError] = useState(false);
    const [message, setMessage] = useState(false);

    const emailReset = useRef(null)
    const handleSubmit = async (e) => {
        console.log(e)
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(crimesCollection,{email, crimeType, crimeLocation, body, date, adminComment})
            setMessage(true);
            getCrimes();
            setLoading(false);
            setError(false);
            setBody('')
            setFile('');
            setEmail('');
            setDate('');
            setCrimeType('');
            setCrimeLocation('');
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
            setMessage(false);
        }
    };
    return ( 
    <div className="report-form">
            <div className="form">
                 {/*This is the report form that the user is going to fill*/}
                <form onSubmit={handleSubmit}>
                    <h4>Report a crime</h4>
                    <input type="email" placeholder="Email here" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <select value={crimeType} onChange={(e) => setCrimeType(e.target.value)} required>
                        <option selected>None</option>
                        <option >Robbery</option>
                        <option >Fighting</option>
                        <option >Exam Malpractice</option>
                        <option>Kidnap</option>
                        <option >Murder</option>
                        <option>Cultism</option>
                        <option >Rape</option>
                        <option>Drug Trafficking</option>
                        <option>Financial Crime</option>
                        <option>Misbehaving</option>
                    </select>
                    <input type="text" placeholder="Crime location" required value={crimeLocation} onChange={(e) => setCrimeLocation(e.target.value)}/>
                    <textarea placeholder="Kindly write down the detail of the crime." required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                    <label style={{display: 'block', textAlign: 'left', paddingLeft: '50px'}}>Date crime was committed.</label>
                    <input type="date" required value={date} onChange={(e) => setDate(e.target.value)}/>
                    <label style={{ display: 'block', textAlign: 'left', paddingLeft: '50px' }}>Add evidence (if any).</label>
                    <input type="file" value={file}/>
                    {!loading && <button>Submit</button>}
                    {loading && <button>Submitng...</button>}
                    {message && <div style={{ padding: '20px', background: '#effff0', border: '1px solid #2ee719', height: '100px', margin: '20px 0', borderRadius: '4px', color: '#2ee719'}}>Complaint lodged successfully, you will be contacted if necessary.</div>}
                    {error && <div style={{ padding: '20px', background: '#ffefef', border: '1px solid #e7195a', height: '100px', margin: '20px 0', borderRadius: '4px', color: '#e7195a' }}>{error.message}</div>}
                </form>
            </div>
    </div> 
    );
}

export default ReportForm;