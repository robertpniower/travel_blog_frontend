import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Modal, Grid, IconButton, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputField from './inputField';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
};

export default function LoginModal({ showModal, setShowModal, isSignUp, setIsSignUp }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
   



    const handleClose = () => setShowModal(false);

    const handleDelayedClose = () => {
        setTimeout(handleClose, 300);
    };

    

    const handleSubmit = async () => {
        try {
            if (isSignUp) {
                const response = await axios.post('http://localhost:8000/users/create', { name, email, password, role: 'user', avatar_url: avatar });

                console.log('User created:', response.data);
            } else {
                // Handle login logic here
                console.log('Login', { email, password });
            }
            handleClose();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display="flex" flexDirection="row">
                        <Box flexGrow={1} display="flex" alignItems="center">
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {isSignUp ? 'Sign Up' : 'Log In'}
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton
                                onClick={handleDelayedClose}
                                sx={{
                                    color: 'black',
                                    transition: 'background-color 0.5s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(128, 128, 128, 0.1)',
                                    },
                                    '&:active': {
                                        backgroundColor: 'rgba(128, 128, 128, 0.3)',
                                    },
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    <Box component="form" sx={{ mt: 2 }}>
                        <InputField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <InputField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                        />

                        <Grid container justifyContent="center" sx={{ mt: 2 }}>
                            <Button variant="contained" onClick={handleSubmit}>
                                Log In
                            </Button>
                        </Grid>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
}

