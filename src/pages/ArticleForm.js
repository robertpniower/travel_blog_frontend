import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '../hooks/useFetchData';
import { fetchCategories } from '../services/categoryServices';
import { fetchCountries } from '../services/countryServices';
import { fetchCities } from '../services/cityServices';
import { Paper, Box, Typography, Button } from '@mui/material';
import AddPictureModal from '../components/pictureModal'
import InputField from '../components/inputField';
import MultiSelectDropDown from '../components/multiSelectDropDown';
import SingleSelectDropDown from '../components/singleSelectDropDown';
import AddCityModal from '../components/CityModal';
import AddCountryModal from '../components/CountryModal';
import CategoryModal from '../components/CategoryModal';

export default function ArticleForm() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState([{ id: '', title:''}]);
    const [country, setCountry] = useState({ id: '', name: '' });
    const [city, setCity] = useState({ id: '', name: '' });
    const [cities, setCities] = useState([]);

    const { data: categories, refetch: refetchCategories } = useFetchData(fetchCategories);
    const { data: countries, refetch: refetchCountries } = useFetchData(fetchCountries);

    useEffect(() => {
        if (country?.id) {
            fetchCities(country.id)
                .then(setCities)
                .catch((err) => console.error('Error fetching cities:', err.message));
        } else {
            setCities([]);
        }
    }, [country]);

    const handleSubmit = () => {
        console.log('Title:', title);
        console.log('Category:', category);
        console.log('Country:', country);
        console.log('City:', city);
        if (title && category[0].title && country.country && city.city_name) {
            const article = { title, category, country, city };
            console.log(Object.entries(article));
            navigate('/article-editor', { state: { article } });
        } else {
            alert('Please fill in all fields before proceeding.');
        }
    };

    return (
        <Paper sx={{ padding: '8px' }}>
            <Box>
                <Typography component='h1' variant='h4' gutterBottom align='center'>
                    Add Article Information
                </Typography>
            </Box>
            <Box>
                <InputField
                    label='Article Title'
                    value={title}
                    type='text'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <MultiSelectDropDown
                    type='Category'
                    data={categories}
                    multiple={true}
                    sendData={setCategory}
                    ModalComponent={CategoryModal}
                    modalProps={{ type: 'Category' }}
                    onAdd={refetchCategories} // Refresh categories after adding
                />
                <SingleSelectDropDown
                    type='Country'
                    data={countries}
                    sendData={setCountry}
                    ModalComponent={AddCountryModal}
                    modalProps={{ type: 'Country' }}
                    onAdd={refetchCountries} // Refresh countries after adding
                />
                {country?.id && (
                    <SingleSelectDropDown
                        type='City'
                        data={cities}
                        sendData={setCity}
                        ModalComponent={AddCityModal}
                        modalProps={{ type: 'City', country_Id: country.id }}
                        onAdd={() => fetchCities(country.id).then(setCities)} // Refresh cities after adding
                    />
                )}
                <Box display='flex' justifyContent='flex-end' sx={{ mt: 3 }}>
                    <Button variant='contained' color='secondary' size='large' onClick={handleSubmit}>
                        Next
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
