import React, { useState } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import { fetchCategories } from '../services/categoryServices';
import { fetchCountries } from '../services/countryServices';
import { fetchCities } from '../services/cityServices';
import { Paper, Box, Typography, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionActions from '@mui/material/AccordionActions';

import InputField from '../components/inputField';
import MultiSelectDropDown from '../components/multiSelectDropDown';
import SingleSelectDropDown from '../components/singleSelectDropDown';
import TextInput from '../components/textInput';
import AddCategoryModal from '../components/addCategoryModal';
import AddCityModal from '../components/addCityModal';
import AddCountryModal from '../components/addCountryModal';
import AddPictureModal from '../components/addPictureModal';

export default function ArticleForm() {
    const [article, setArticle] = useState({title: '', content: ''});
    const { data: categories, error: categoryError } = useFetchData(fetchCategories);
    const { data: countries, error: countryError } = useFetchData(fetchCountries);
    const [cities, setCities] = useState([]);
    const [country, setCountry] = useState('');
    const [category, setCategory] = useState('');
    const [pictures, setPictures] = useState([])
    const [posts, setPosts] = useState([{ title: '', content: '' }]);
    const [expanded, setExpanded] = useState(1);
    const [open, setOpen] = useState(false);

    const handleGetCountry = async (countryId) => {
        setCountry(countryId);
        try {
            const cityResponse = await fetchCities(countryId);
            setCities(cityResponse);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleGetCategory = (categoryId) => {
        setCategory(categoryId);
    };
    const handleGetPictureURL = async (pictures) => {

        setPictures(pictures)
        console.log(pictures)
    }

    const addAnotherPost = () => {
        const newPostIndex = posts.length;
        setPosts([...posts, { title: '', content: '' }]);
        setExpanded(newPostIndex);
    };

    const handlePostChange = (index, field, value) => {
        const updatedPosts = [...posts];
        updatedPosts[index][field] = value;
        setPosts(updatedPosts);
    };

    const deletePost = () => {
        if (posts.length > 1) {
            setPosts((prevPosts) => prevPosts.slice(0, -1));
        }
    };

    const handleAccordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSubmit = () => {

    }

    return (
        <Paper sx={{ padding: '8px' }}>
            <Box>
                <Typography component='h1' variant='h4' gutterBottom align='center'>
                    Add Article
                </Typography>
            </Box>
            <Box>
                <Accordion expanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1-content' id='panel1-header'>
                        <Typography component='h1' variant='h5'>
                            Add Article
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box component='form' margin='7px'>
                            <InputField
                                label='Article Title'
                                margin='normal'
                                value={article.title}
                                type='text'
                                onChange={(e) => setArticle({ ...article, title: e.target.value})}
                            />
                            <MultiSelectDropDown
                                type='Category'
                                data={categories}
                                multiple={true}
                                sendData={handleGetCategory}
                                setMultiple={handleGetCategory}
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
                                    type='City'
                                    data={cities}
                                    sendData={() => { }}
                                    ModalComponent={AddCityModal}
                                    modalProps={{ type: 'City', country_Id: country }}
                                />
                            )}

                            <TextInput
                                label='Article Text'
                                value={article.content}
                                type='text'
                                onChange={(e) => setArticle({ ...article, content: e.target.value})}
                            />
                        </Box>
                        <Box display='flex' flexDirection='row' justifyContent='flex-end' sx={{ m: 2 }}>
                            <Button
                                variant='contained'
                                color='secondary'
                                size='large'
                                onClick={() => {
                                    setOpen(true);
                                }}
                            >
                                Add Pictures
                            </Button>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                {posts.map((post, index) => (
                    <Accordion
                        key={index}
                        expanded={expanded === index}
                        onChange={handleAccordionChange(index)}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`post-panel-${index}-content`} id={`post-panel-${index}-header`}>
                            <Typography component='h1' variant='h5'>
                                {index === 0 ? 'Add Post' : `Add Content ${index + 1}`}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box component='form' margin='7px'>
                                <InputField
                                    label='Post Title'
                                    margin='normal'
                                    value={post.title}
                                    type='text'
                                    onChange={(e) => handlePostChange(index, 'title', e.target.value)}
                                />
                                <TextInput
                                    label='Post Text'
                                    value={post.content}
                                    type='text'
                                    onChange={(e) => handlePostChange(index, 'content', e.target.value)}
                                />
                            </Box>
                        </AccordionDetails>
                        <AccordionActions>
                            <Box display='flex' flexDirection='row' justifyContent='flex-end' sx={{ m: 2 }}>
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    size='large'
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                >
                                    Add Pictures
                                </Button>
                                {open && (<AddPictureModal open={open} setOpen={setOpen} sendData={handleGetPictureURL} />)}
                            </Box>
                        </AccordionActions>
                    </Accordion>
                ))}

                <Box display='flex' flexDirection='column' justifyContent='space-around' sx={{ m: 2, mt: 3 }}>
                    <Box display='flex' flexDirection='row' justifyContent='space-around' sx={{ p: 4, mb: 5, borderBottom: 2, borderColor: 'divider', flexGrow: 1 }}>
                        <Button variant='contained' color='success' size='large' onClick={addAnotherPost}>
                            Add Content
                        </Button>
                        <Button variant='contained' color='error' size='large' onClick={deletePost}>
                            Delete Content
                        </Button>
                    </Box>

                    <Box display='flex' flexDirection='row' justifyContent='space-around' sx={{ m: 2 }}>
                        <Button variant='contained' color='secondary' size='large'>
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            color='secondary'
                            size='large'
                            onClick={handleSubmit}
                            >
                            Submit
                        </Button>
                    </Box>

                </Box>
            </Box>
        </Paper>
    );
}
