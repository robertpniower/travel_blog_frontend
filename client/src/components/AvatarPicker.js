import React, { useState, useEffect } from 'react';
import { Box, Grid, Avatar, IconButton, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createAvatar } from '@dicebear/core';
import { avataaars } from '@dicebear/collection';

const AvatarPicker = ({ handleAvatarSelect, avatarPicker, setAvatarPicker, style, avatar }) => {
    const [avatarUrls, setAvatarUrls] = useState([]);

    useEffect(() => {
        const generateAvatars = () => {
            const avatars = [];
            for (let i = 1; i <= 32; i++) {
                const avatarUrl = createAvatar(avataaars, {
                    seed: `avatar${i}`,
                    size: 128,
                    mouth: ['smile']
                }).toDataUri();
                avatars.push(avatarUrl);
            }
            setAvatarUrls(avatars);
        };

        generateAvatars();
    }, []);

    const handleClose = () => setAvatarPicker(false);

    const handleDelayedClose = () => {
        setTimeout(handleClose, 300);
    };

    const handleAvatarSelection = (url) => {
        handleAvatarSelect(url);
        console.log(url)
        setTimeout(() => {
            handleDelayedClose();
        }, 300); // Adjust delay as needed
    };

    return (
        <Modal
            open={avatarPicker}
            onClose={() => setAvatarPicker(false)}
            aria-labelledby="avatar-picker-title"
            aria-describedby="avatar-picker-description"
        >
            <Box sx={{ ...style, width: 600 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography id="avatar-picker-title" variant="h6" component="h2">
                        Pick an Avatar
                    </Typography>
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
                <Box sx={{ p: 2, maxHeight: 400, overflowY: 'auto' }}>
                    <Grid container spacing={2}>
                        {avatarUrls.map((url, index) => (
                            <Grid item xs={3} key={index}>
                                <IconButton
                                    onClick={() => handleAvatarSelection(url)}
                                    sx={{
                                        borderRadius: '50%',
                                        border: avatar === url ? '2px solid blue' : 'none',
                                    }}
                                >
                                    <Avatar
                                        src={url}
                                        sx={{
                                            width: 56,
                                            height: 56,
                                            transition: 'background-color 0.5s ease',
                                            '&:hover': {
                                                backgroundColor: 'rgba(128, 128, 128, 0.1)',
                                            },
                                            '&:active': {
                                                backgroundColor: 'rgba(128, 128, 128, 0.3)',
                                            },
                                        }}
                                    />
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Modal>
    );
};

export default AvatarPicker;
