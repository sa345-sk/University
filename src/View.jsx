import note from './assets/logout.svg';
import {Link} from 'react-router-dom';
import {updateDoc, doc} from 'firebase/firestore';
import {docRef} from './config/firebase';
import { useState } from 'react';
const View = (prop) => {
    const {crime, id} = prop;
    const commentDoc = doc(docRef, 'crimes', id);
    const [adminComment, setAdminComment] = useState('');
    const addComment = async (e) => {
        e.preventDeafult()
        try {
            await updateDoc(commentDoc, { adminComment: adminComment })
            alert('Successfully updated');
            console.log('sucess')
        } catch (error) {
            console.log(error);
            alert('Failed to lodge complaint');
        }
    }
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
                <p>{crime.body}</p>
                <main className="response">
                        <Link style={{ color: '#e7dd19'}}>Process</Link>
                        <Link style={{ color: '#1e5dff'}}>Contact sender</Link>
                        <Link style={{ color: '#4dc018'}}>Resolve</Link>
                </main>
                <form onSubmit={addComment}>
                    <input type="text" placeholder='Add comments...' value={adminComment} onChange={(e) => setAdminComment(e.target.value)}/>
                    <button>Post</button>
                </form>
            </div>
        </article>
      </div>    
    </div> 
    );
}
 
export default View;