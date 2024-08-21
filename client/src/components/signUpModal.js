import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Modal, Grid, IconButton, Avatar, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputField from './inputField';
import AvatarPicker from './AvatarPicker';

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

export default function SignUpModal({ showModal, setShowModal, isSignUp, user }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarPicker, setAvatarPicker] = useState(false);
  const [role, setRole] = useState('user');

  useEffect(() => {
    if (!isSignUp && user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar_url);
      setRole(user.role);
    }
  }, [isSignUp, user]);

  const handleClose = () => setShowModal(false);

  const handleDelayedClose = () => {
    setTimeout(handleClose, 300);
  };

  const handleAvatarSelect = (avatarUrl) => {
    setAvatar(avatarUrl);
  };

  const handleSubmit = async () => {
    try {
      if (isSignUp) {
        const response = await axios.post('http://localhost:8000/users/create', { name, email, password, role, avatar_url: avatar });
        console.log('User created:', response.data);
      } else {
        const response = await axios.put(`http://localhost:8000/users/update/${user.id}`, { name, email, password, role, avatar_url: avatar });
        console.log('User updated:', response.data);
      }
      handleClose();
    } catch (error) {
      console.error('Error creating/updating user:', error);
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
                {isSignUp ? 'Sign Up' : 'Update User'}
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
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
            />
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
            {!isSignUp && (
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  value={role}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            )}
            <Box display="flex" flexDirection="column" alignItems="center">
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => setAvatarPicker(true)}
                sx={{ mb: 2 }}
              >
                Add Avatar
              </Button>
              {avatar && (
                <Avatar src={avatar} 
                  sx={{ 
                    width: 56, 
                    height: 56, 
                    mb: 2,
                    borderRadius: '50%',
                    border: avatar !== false ? '2px solid blue' : 'none', }} />
              )}
              <AvatarPicker
                handleAvatarSelect={handleAvatarSelect}
                avatarPicker={avatarPicker}
                setAvatarPicker={setAvatarPicker}
                style={style}
                avatar={avatar}
              />
            </Box>
            <Grid container justifyContent="center" sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleSubmit}>
                {isSignUp ? 'Sign Up' : 'Update'}
              </Button>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
