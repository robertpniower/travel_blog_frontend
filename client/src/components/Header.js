import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NavLink } from 'react-router-dom';
import SignUpModal from './signUpModal';
import LoginModal from './loginModal';

function Header(props) {
  const { sections, title } = props;
  const [activeTab, setActiveTab] = useState(0);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenLogin = () => {
    setShowLoginModal(true);
  };

  const handleOpenSignUp = () => {
    setIsSignUp(true);
    setShowSignUpModal(true);
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button
          onClick={handleOpenSignUp}
          variant="outlined"
          size="small"
        >
          Sign up
        </Button>
        <Typography
          component="h1"
          variant="h1"
          color="inherit"
          align="center"
          noWrap
          sx={{
            flex: 1,
            fontFamily: "Gloria Hallelujah", 
            fontWeight: '400',
            fontSize: '4.5rem',
            color: '#1aab71', 
            mb: 3,
            mt: 2,
          }}
        >
          {title}
        </Typography>
        <IconButton>
        </IconButton>
        <Button
          variant="outlined"
          size="small"
          onClick={handleOpenLogin}
        >
          Login
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{
          justifyContent: 'center',
          overflowX: 'auto',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', flexGrow: 1 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="sections tabs"
            centered
            sx={{
              '.Mui-selected': {
                color: '#1aab71', // Active tab color
                borderBottom: '3px solid #1aab71', // Active tab underline
              },
              '.MuiTab-root': {
                textTransform: 'none',
                color: '#1A86AB', // Inactive tab color
                fontSize: '1rem',
                fontWeight: 500,
              },
            }}
          >
            {sections.map((section, index) => (
              <Tab
                key={section.title}
                label={section.title}
                component={NavLink}
                to={section.url}
                value={index}
                sx={{
                  p: 2,
                  flexShrink: 0,
                  mr: 4,
                  '&:hover': {
                    color: '#1AABA1', // Hover effect color
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Toolbar>
      <SignUpModal
        showModal={showSignUpModal}
        setShowModal={setShowSignUpModal}
        isSignUp={isSignUp}
      />
      <LoginModal
        showModal={showLoginModal}
        setShowModal={setShowLoginModal}
      />
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
