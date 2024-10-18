import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/categoryServices';
import { fetchCountries } from '../services/countryServices';
import { fetchCities } from '../services/cityServices';
import { Paper, Box, Typography,  Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import InputField from '../components/inputField';
import MultiSelectDropDown from '../components/multiSelectDropDown';
import SingleSelectDropDown from '../components/singleSelectDropDown';
import TextInput from '../components/textInput';
import AddCategoryModal from '../components/addCategoryModal';
import AddCityModal from '../components/addCityModal';
import AddCountryModal from '../components/addCountryModal';

export default function ArticleForm() {
    const [article, setArticle] = useState('');
    const [title, setTitle] = useState('')
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [country, setCountry] = useState('');
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
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Paper sx={{ padding: "8px" }}>
            <Box>
                <Typography component='h1' variant='h4' gutterBottom align="center">Add Article</Typography>
            </Box>
            <Box>
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography component='h1' variant='h5'>Article</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box component="form" margin='7px'>

                            <InputField
                                label="Article Title"
                                margin="normal"
                                value={title}
                                type='text'
                                onChange={(e) => setTitle(e.target.value)}
                            />
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
                                ModalComponent={AddCountryModal}
                                modalProps={{ type: 'Country' }}
                            />
                            {country && (
                                <SingleSelectDropDown
                                    type="City"
                                    data={cities}
                                    sendData={() => { }}
                                    ModalComponent={AddCityModal}
                                    modalProps={{ type: 'City', country_Id: country }}
                                />
                            )}

                            <TextInput
                                label='Article Text'
                                value={article}
                                type='text'
                                onChange={(e) => setArticle(e.target.value)}
                            />

                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        Post
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box component="form" margin='7px'>

                            <InputField
                                label="Article Title"
                                margin="normal"
                                value={title}
                                type='text'
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextInput
                                label='Article Text'
                                value={article}
                                type='text'
                                onChange={(e) => setArticle(e.target.value)}
                            />
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Box display='flex' flexDirection='row' justifyContent='space-around' alignItems='center'
                    sx={{m:'4'}} >
                    <Button variant="contained" color='secondary'>Cancel</Button>
                    <Button variant="contained" color='secondary' >Agree</Button>

                </Box>



            </Box>



        </Paper>
    );
}
