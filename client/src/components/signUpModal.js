import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputField from './inpuField';

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

export default function SignUpModal({ showModal, setShowModal, isSignUp, setIsSignUp }) {
    const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClose = () => setShowModal(false);

  const handleAuthAction = () => {
    if (isSignUp) {
      // Handle sign-up logic here
      console.log('Sign Up', { name, email, password });
    } else {
      // Handle login logic here
      console.log('Login', { email, password });
    }
    handleClose();
  };

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isSignUp ? 'Sign Up' : 'Login'}
        </Typography>
        {isSignUp && (
          <InputField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <InputField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleAuthAction}
        >
          {isSignUp ? 'Sign Up' : 'Login'}
        </Button>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 1 }}
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? 'Switch to Login' : 'Switch to Sign Up'}
        </Button>
      </Box>
    </Modal>
  );
}
