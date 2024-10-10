import axios from 'axios';

export const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:8000/countries/countries');
      return response.data
      
    } catch (error) {
      console.error("Error fetching countries", error);
    }
  };