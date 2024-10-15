import React, { useState } from 'react';
import {
    Modal, Box, Typography,
    Button
} from '@mui/material';
import InputField from './inputField';

export default function AddCityModal({ open, setOpen, type }) {
    const [newCity, setNewCity] = useState("");
    
   
    const isCity = type === 'City';
  

    const handleSubmit = async () => {
        setOpen(false)
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
                    value={(newCity) || ''}
                    onChange={(e) => setNewCity(e.target.value)}
                />

                


                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => {
                            handleSubmit();
                            
                        }}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
