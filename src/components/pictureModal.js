import React, { useState, useCallback } from 'react';
import {
    Modal, Box, Typography, Button, IconButton, Alert, TextField
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';

import InputField from './inputField';
import { uploadPictures } from '../services/pictureServices';

export default function AddPictureModal({ open, setOpen, sendData }) {
    const [files, setFiles] = useState([]);
    const [pictureData, setPictureData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePictureDataChange = (index, field, value) => {
        const updatedPictures = [...pictureData];
        updatedPictures[index] = {
            ...updatedPictures[index],
            [field]: value,
        };
        setPictureData(updatedPictures);
    };

    const onDrop = useCallback((acceptedFiles) => {
        setErrorMessage('');
        const filesWithPreview = acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setFiles((prevFiles) => [...prevFiles, ...filesWithPreview]);

        // Initialize picture data for each new file
        const newPictureData = acceptedFiles.map(() => ({ title: '', content: '' }));
        setPictureData((prevData) => [...prevData, ...newPictureData]);
    }, []);

    const onDropRejected = () => {
        setErrorMessage('Only image files (JPEG, PNG, GIF, WebP) are allowed.');
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        onDropRejected,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/gif': [],
            'image/webp': [],
        },
        multiple: true,
    });

    const handleFileRemove = (fileIndex) => {
        const updatedFiles = files.filter((_, index) => index !== fileIndex);
        setFiles(updatedFiles);

        const updatedPictureData = pictureData.filter((_, index) => index !== fileIndex);
        setPictureData(updatedPictureData);
    };

    React.useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const handleUpload = async () => {
        try {
            const result = await uploadPictures(files, pictureData);
            console.log('Upload successful:', result);
            sendData(result);
            setOpen(false);
            setFiles([]);
            setPictureData([]);
        } catch (error) {
            setErrorMessage(error.message);
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
                    width: 600,
                    height: 'auto',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >
                <Typography id="modal-title" component="h1" variant="h6" gutterBottom>
                    Upload Pictures
                </Typography>

                {errorMessage && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {errorMessage}
                    </Alert>
                )}
                <Box
                    {...getRootProps()}
                    sx={{
                        border: '2px dashed #3a20e3',
                        padding: '50px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <input {...getInputProps()} />
                    <Button color='primary' variant='outlined'>Select or Drag and drop Pictures</Button>
                </Box>

                {files.map((file, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                            sx={{
                                position: 'relative',
                                width: 100,
                                height: 100,
                                borderRadius: 1,
                                overflow: 'hidden',
                                border: '1px solid #ddd',
                            }}
                        >
                            <img
                                src={file.preview}
                                alt={file.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    color: '#fff',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' }
                                }}
                                onClick={() => handleFileRemove(index)}
                                size="small"
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <InputField
                                label="Title"
                                fullWidth
                                value={pictureData[index]?.title || ''}
                                onChange={(e) => handlePictureDataChange(index, 'title', e.target.value)}
                            />
                            <InputField
                                label="Description"
                                fullWidth
                                multiline
                                rows={2}
                                sx={{ mt: 1 }}
                                value={pictureData[index]?.content || ''}
                                onChange={(e) => handlePictureDataChange(index, 'content', e.target.value)}
                            />
                        </Box>
                    </Box>
                ))}

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                    <Button onClick={() => setOpen(false)} variant='contained' color="error">
                        Cancel
                    </Button>
                    <Button color="success" variant='contained' onClick={handleUpload}>
                        Upload
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
