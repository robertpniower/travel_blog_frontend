import axios from 'axios';


const URL = `http://localhost:8000`; 

export const uploadPictures = async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('files', file);  
    });

    console.log('Uploading files:', files);  
   

    try {
        const response = await axios.post(`${URL}/images/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Upload error:', error);  // Log the error
        throw new Error(error.response?.data?.message || 'Error uploading pictures');
    }
};


