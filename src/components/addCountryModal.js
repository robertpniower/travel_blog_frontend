import React, { useState } from 'react';
import { addCountry } from '../services/countryServices';
import InputField from './inputField';
import {
    Modal, Box, Typography,
    Button
} from '@mui/material';

export default function AddCountryModal({ open, setOpen, type }) {
    const [countryCode, setCountryCode] = useState('');
    const [country, setCountry] = useState('');

    const isCountry = type === 'Country';

    const handleSubmit = async () => {
            try {
                await addCountry(countryCode, country);
            } catch (err) {
                console.error("Error adding country:", err);
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
                <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
                    Add New {type}
                </Typography>

                <InputField
                    label={`${type} Name`}
                    value={'country'}
                    onChange={(e) => setCountry(e.target.value)}
                />

                {isCountry && (
                    <InputField
                        label="Country Code"
                        value={countryCode || ''}
                        onChange={(e) => setCountryCode(e.target.value)}
                    />
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => {
                            handleSubmit();
                            setOpen(false);
                        }}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
