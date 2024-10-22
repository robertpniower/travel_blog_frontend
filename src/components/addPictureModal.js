import React, { useState, useCallback } from 'react';
import {
    Modal, Box, Typography, Button, IconButton, Alert
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import { uploadPictures } from '../services/pictureServices'; 

export default function AddPictureModal({ open, setOpen }) {
    const [files, setFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
        setErrorMessage('');
        const filesWithPreview = acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
        );
        setFiles((prevFiles) => [...prevFiles, ...filesWithPreview]);
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

    const handleFileRemove = (fileName) => {
        setFiles(files.filter(file => file.name !== fileName));
    };

    React.useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview));
        };
    }, [files]);

    const handleUpload = async () => {
        try {
            const result = await uploadPictures(files);
            console.log('Upload successful:', result);
            setOpen(false); // Close modal after successful upload
            // Optionally, reset files or handle additional logic here
            setFiles([]);
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
                    height: 500,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Typography id="modal-title" variant="h6" gutterBottom>
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
                        padding: '40px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                    }}
                >
                    <input {...getInputProps()} />
                    <Typography color='#3a20e3'>
                        Drag & drop pictures here, or click to select files (JPEG, PNG, GIF, WebP)
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        gap: 2,
                        mb: 2,
                    }}
                >
                    {files.map((file, index) => (
                        <Box
                            key={index}
                            sx={{
                                position: 'relative',
                                width: 100,
                                height: 100,
                                borderRadius: 1,
                                overflow: 'hidden',
                                border: '1px solid #ddd',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
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
                                onClick={() => handleFileRemove(file.name)}
                                size="small"
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        onClick={() => setOpen(false)}
                        variant='contained'
                        color="error"
                        sx={{ mr: 2 }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="success"
                        variant='contained'
                        onClick={handleUpload}
                    >
                        Upload
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
