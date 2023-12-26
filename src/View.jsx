import note from './assets/logout.svg';
import {Link} from 'react-router-dom';
import {updateDoc, doc} from 'firebase/firestore';
import {docRef} from './config/firebase';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import useFile from './useFile';
const View = (prop) => {
    const navigate = useNavigate();
    const {crime, id} = prop;
    const [adminComment, setAdminComment] = useState('');
    const commentDoc = doc(docRef, 'crimes', id);
    const {accessMetadata, getFile, files, IDs, } = useFile();
    const addComment = async () => {
        try {
            await updateDoc(commentDoc, { adminComment: adminComment })
            alert('Successfully updated');
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            alert('Failed to lodge complaint');
        }
    }
    useEffect(() => {
        IDs.forEach((id) => {
            console.log(id);
        })
        accessMetadata();
        getFile();
        // ifFileIsTheSame(id);
    }, [IDs]);
    return ( 
    <div className="v-c">
      <div className="nav-view"><h1>Info</h1></div>
      <div className="crimes">
        <article>
            <div className="date">
                <p>{crime.date.substring(8, 10)}</p>
                <span>{crime.date.substring(5, 7)} / {crime.date.substring(0, 4)}</span>
            </div>
            <img src={note} alt="note" />
            <div>
                <h4>{crime.crimeType}</h4>
                <p>Email of the sender: {crime.email}</p>
                <p>{crime.body}</p>
                <p>Admin Comment: {crime.adminComment}</p>
                <main className="response">
                        <Link style={{ color: '#e7dd19'}}>Process</Link>
                        <Link style={{ color: '#1e5dff'}}>Contact sender</Link>
                        <Link style={{ color: '#4dc018'}}>Resolve</Link>
                </main>
                    <input type="text" placeholder='Add comments...' value={adminComment} onChange={(e) => setAdminComment(e.target.value)}/>
                    <button onClick={addComment}>Post</button>
            </div>
        </article>
      </div>    
    </div> 
    );
}
 
export default View;