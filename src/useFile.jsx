import { ref, uploadBytes, listAll, getDownloadURL, getMetadata} from 'firebase/storage';
import { storage } from './config/firebase';
import {useState} from 'react';
const useFile = () => {
    const [error, setError] = useState(null);
    const filesRef = ref(storage, 'crimeFiles/');
    const [files, setFiles] = useState([]);
    const [IDs, setIDs] = useState([]);
    const [url, setUrl] = useState('');
    const [fileType, setFileType] = useState('');
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
        setError(error);
       }
    } 
    const accessMetadata = async (id) => {
        try {
            const response = await listAll(filesRef); 
            const ID = [];
            for (const item of response.items) {
                
                try {
                    const fileRef = ref(storage, item.fullPath);
                    const metadata = await getMetadata(fileRef);
                    ID.push(metadata.customMetadata.referenceTo);
                    if (metadata.customMetadata && metadata.customMetadata.referenceTo === id) {
                        const downloadurl = await getDownloadURL(fileRef);
                        setUrl(downloadurl);
                        const fileType = metadata.contentType;
                        setFileType(fileType);
                    }
                    setError(false);
                } catch (error) {
                    setError(error);
                }
                setIDs(ID)
            }
        } catch (error) {
            setError(error);
        }
    };


    return { uploadFile, error, getFile, accessMetadata, IDs, url, fileType};
}

export default useFile;