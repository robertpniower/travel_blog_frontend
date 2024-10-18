import axios from 'axios';

export const fetchCities = async (country_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/cities/cities/${country_id}`);
      return response.data
    } catch (error) {
      console.error(`Error fetching cities for country_id: ${country_id}`, error);
    }
  };

  export const createCity = async (city_name, country_Id) => {
    try {
        const response = await axios.post('http://localhost:8000/cities/create', { city_name, country_Id });
        return response.data;  
    } catch (err) {
        console.error('Error creating Category:', err);
        throw err;  
    }
  }