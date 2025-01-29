import React from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

const CategoryModal = ({ open, onClose, isEdit, category }) => {
  const handleSubmit = () => {
    // Logic for creating/editing a category
    console.log(isEdit ? 'Edit Category' : 'Create Category');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 1,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {isEdit ? 'Edit Category' : 'Create Category'}
        </Typography>
        <TextField
          label="Category Name"
          defaultValue={isEdit ? category?.title : ''}
          fullWidth
          margin="normal"
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {isEdit ? 'Save Changes' : 'Create'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CategoryModal;
