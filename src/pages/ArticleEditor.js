import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Paper, Button, List, Divider, Chip } from '@mui/material';
import TextEditor from '../components/TextEditor';
import ListItemModal from '../components/ListItemModal';
import CategoryModal from '../components/CategoryModal';
import CountryModal from '../components/CountryModal';
import CityModal from '../components/CityModal';

function ArticleEditor() {
    const location = useLocation();
    const { title, category, country, city } = location.state.article;
    const [content, setContent] = useState('');
    const [open, setOpen] = useState(false)

    const handleSubmit = () => {
        console.log('Article content saved:', content);
        console.log(category)
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom align="center">
                {`Editing Article: ${title}`}
            </Typography>

            <Paper sx={{ padding: 2, marginBottom: 3 }}>
                <List>
                    <ListItemModal
                        primaryText={`Category: ${category.map((item) => (
                            console.log(item),
                            <Chip key={item.id} label={item.title}/>
                        ))}`}
                        modalComponent={CategoryModal}
                        isEdit={true}
                        modalProps={{ category, onClose: () => setOpen(false) }}
                    />
                    <Divider />
                    <ListItemModal
                        primaryText={`Country: ${country.country}`}
                        modalComponent={CountryModal}
                        isEdit={true}
                        modalProps={{ country }}
                    />
                    <Divider />
                    <ListItemModal
                        primaryText={`City: ${city.city_name}`}
                        modalComponent={CityModal}
                        isEdit={true}
                        modalProps={{ city }}
                    />
                </List>
            </Paper>

            <Box
                display="flex"
                flexDirection="column"
                sx={{ border: '1px solid #ddd', padding: 4, borderRadius: 1 }}
            >
                <Typography variant="h6" gutterBottom>
                    Article Content
                </Typography>
                <TextEditor onContentChange={setContent} />
                <Box display="flex" justifyContent="flex-end" sx={{ mt: 7 }}>
                    <Button variant="contained" color="secondary" size="large" onClick={handleSubmit}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default ArticleEditor;
