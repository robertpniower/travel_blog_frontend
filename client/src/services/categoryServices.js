import axios from 'axios';

export const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/categories/categories');
      return response.data
      
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };


export const createCategory = async (title, content) => {
  try {
    const response = await axios.post('http://localhost:8000/categories/create', { title, content });
    return response.data;  
} catch (err) {
    console.error('Error creating Category:', err);
    throw err;  
}
}