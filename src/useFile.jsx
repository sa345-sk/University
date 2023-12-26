import { ref, uploadBytes, listAll, getDownloadURL, getMetadata, list,} from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from './config/firebase';
import {useEffect, useState} from 'react';
const useFile = () => {
    const [error, setError] = useState(null);
    const filesRef = ref(storage, 'crimeFiles/');
    const [files, setFiles] = useState([]);
    const [IDs, setIDs] = useState([]);
    const uploadFile = async (file, complaintid) => {
        try {
            if (file === null) return;
            const fileRef = ref(storage, `crimeFiles/${file.name}_${complaintid}`);
            const metadata = {
                customMetadata: {
                    'referenceTo': complaintid
                }
            }
            await uploadBytes(fileRef, file, metadata);
            setError(false);
        } catch (error) {
            setError(error);
        }
    }
    const getFile = async () => {
       try {
           const response = await listAll(filesRef);
           response.items.forEach(async (item) => {
              const url = await getDownloadURL(item);
              setFiles((prev) => [...prev, url]);
           });
           setError(false);
       } catch (error) {
        console.log(error);
        setError(error);
       }
    } 
    const accessMetadata = async () => {
        try {
            const response = await listAll(filesRef); 
            const ID = [];
            for (const item of response.items) {
                
                try {
                    const fileRef = ref(storage, item.fullPath);
                    const metadata = await getMetadata(fileRef);
                    ID.push(metadata.customMetadata.referenceTo);
                    setError(false);
                } catch (error) {
                    console.log(error);
                    setError(error);
                }
                setIDs(ID)
            }
        } catch (error) {
            console.log('Error listing files:', error);
            setError(error);
        }
    };

    useEffect(() => {
        console.log(IDs);
    }, [IDs])
    return { uploadFile, error, getFile, accessMetadata, files, IDs, };
}

export default useFile;