import axios from 'axios';

const API_URL = 'http://localhost:8000/images'; 

// Function to upload multiple pictures
export const uploadPictures = async (files) => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append('files', file);  // Change 'images' to 'files'

    });

    console.log('Uploading files:', files);  // Log the files being uploaded

    try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
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


