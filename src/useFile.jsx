import { ref, uploadBytes} from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from './config/firebase';
import {useState} from 'react';
import useFecth from './useFirebase';
const useFile = (file, fileId) => {
    let [error, setError] = useState(null);
    const uploadFile = async () => {
        try {
            if (file === null) return;
            const fileRef = ref(storage, `crimeFiles/${file.name + v4()}`);
            const metadata = {
                customMetadata: {
                    'referenceTo': fileId
                }
            }
            await uploadBytes(fileRef, file, metadata);
            setError(false);
        } catch (error) {
            setError(error);
        }
    }
    return {uploadFile, error};
}

export default useFile;