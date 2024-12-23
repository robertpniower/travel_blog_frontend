import React, { useState } from 'react';
import {
    Modal, Box, Typography, Button
} from '@mui/material';
import InputField from './inputField';
import { addCountry } from '../services/countryServices';

export default function AddCategoryModal({ open, setOpen, type }) {
    const [newItem, setNewItem] = useState("");
    const [countryCode, setCountryCode] = useState('');
    const [country, setCountry] = useState('');
    
    const isCountry = type === 'Country';

    const handleSubmit = async () => {
        try {
        
                await addCountry(countryCode, country);

            setOpen(false); 
        } catch (err) {
            console.error("Error submitting:", err);
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="modal-title" variant="h6" gutterBottom>
                    Add New {type}
                </Typography>
                <InputField
                    label={`${type} Name`}
                    value={newItem}
                    onChange={(e) => isCountry ? setCountry(e.target.value) : setNewItem(e.target.value)}
                />
                
                    <InputField
                        label="Country Code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                    />
           
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={() => setOpen(false)} color="primary">Cancel</Button>
                    <Button color="primary" onClick={handleSubmit}>Add</Button>
                </Box>
            </Box>
        </Modal>
    );
}
