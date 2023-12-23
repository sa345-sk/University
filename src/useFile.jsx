import { ref, uploadBytes, listAll, getDownloadURL, getMetadata, list} from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from './config/firebase';
import {useState} from 'react';
const useFile = () => {
    const [error, setError] = useState(null);
    const filesRef = ref(storage, 'crimeFiles/');
    const [files, setFiles] = useState([]);
    const [IDs, setIDs] = useState([]);
    const uploadFile = async (file, complaintid) => {
        try {
            if (file === null) return;
            const fileRef = ref(storage, `crimeFiles/${file.name + v4()}`);
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
                    const fileID = metadata.customMetadata.referenceTo;
                    ID.push(fileID);
                    setError(false);
                } catch (error) {
                    console.log(error);
                    setError(error);
                }
            }
            setIDs(ID)
            console.log(IDs)
        } catch (error) {
            console.log('Error listing files:', error);
            setError(error);
        }
    };
    return { uploadFile, error, getFile, accessMetadata };
}

export default useFile;