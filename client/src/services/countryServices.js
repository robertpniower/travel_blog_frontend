import axios from 'axios';

export const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:8000/countries/countries');
      return response.data
      
    } catch (error) {
      console.error("Error fetching countries", error);
    }
  };

  export const fetchCities = async (country_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/cities/cities/${country_id}`);
      return response.data
    } catch (error) {
      console.error(`Error fetching cities for country_id: ${country_id}`, error);
    }
  };

  export const addCountry = async (country_code, country) => {
    try {
        const response = await axios.post('http://localhost:8000/countries/create', { country_code, country });
        return response.data;  
    } catch (err) {
        console.error('Error creating Country:', err);
        throw err;  
    }
};
