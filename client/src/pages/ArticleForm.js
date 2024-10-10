import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/categoryServices';
import { fetchCountries } from '../services/countryServices'
import { Paper, Box, Typography } from '@mui/material';

import InputField from '../components/inputField';
import DropDown from '../components/dropDown';

export default function ArticleForm() {
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categoriesResponse = await fetchCategories();
                setCategories(categoriesResponse);
                console.log(categoriesResponse)
            } catch (err) {
                setError(err.message);
            }
        };

        const getCountries = async () => {
            try {
                const countriesResponse = await fetchCountries();
                setCountries(countriesResponse);
                console.log(countriesResponse)
            } catch (err) {
                setError(err.message);
            }
        };

        getCategories();
        getCountries();
    }, []);

    const handleAddCategory = (newCategory) => {
        console.log("New Category Added:", newCategory);
    };

    return (
        <Paper sx={{ padding: "8px" }}>
            <Box margin='7px'>
                <Typography>Add Article</Typography>
                <InputField label="Name" margin="normal" />
                <DropDown type='Category' data={categories} />
                <DropDown type='Country' data={countries} />
            </Box>
        </Paper>
    );
}

