import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/categoryServices';
import { fetchCountries } from '../services/countryServices';
import { fetchCities } from '../services/countryServices';
import { Paper, Box, Typography } from '@mui/material';

import InputField from '../components/inputField';
import MultiSelectDropDown from '../components/multiSelectDropDown';
import SingleSelectDropDown from '../components/singleSelectDropDown';
import AddCategoryModal from '../components/addCategoryModal';

export default function ArticleForm() {
    const [categories, setCategories] = useState([])
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [country, setCountry] = useState('')
    const [error, setError] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categoriesResponse = await fetchCategories();
                setCategories(categoriesResponse);
            } catch (err) {
                setError(err.message);
            }
        };

        const getCountries = async () => {
            try {
                const countriesResponse = await fetchCountries();
                setCountries(countriesResponse);
            } catch (err) {
                setError(err.message);
            }
        };



        getCategories();
        getCountries();
    }, []);

    const handleGetCountry = async (countryId) => {
        setCountry(countryId);
        try {
            const cityResponse = await fetchCities(countryId);
            setCities(cityResponse);
            console.log(cityResponse);
        } catch (err) {
            setError(err.message);
        }
    };


    return (
        <Paper sx={{ padding: "8px" }}>
            <Box margin='7px'>
                <Typography variant='h4' gutterBottom align="center">Add Article</Typography>
                <InputField label="Name" margin="normal" />
                <MultiSelectDropDown
                    type="Category"
                    data={categories}
                    multiple={true}
                    setMultiple={setCategories}
                    ModalComponent={AddCategoryModal}
                    modalProps={{ type: 'Category' }}
                />

                <SingleSelectDropDown
                    type='Country'
                    data={countries}
                    sendData={handleGetCountry}

                />
                {country && (
                    <SingleSelectDropDown
                        type="City"
                        data={cities}
                    />
                )}
            </Box>
        </Paper>
    );
}
