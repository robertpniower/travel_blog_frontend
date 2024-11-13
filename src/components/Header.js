import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { NavLink, useNavigate } from 'react-router-dom';
import SignUpModal from './signUpModal';
import LoginModal from './loginModal';
import DestinationTabMenu from './destinationTabMenu';

function Header({ sections, title }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenLogin = () => setShowLoginModal(true);
  const handleOpenSignUp = () => {
    setIsSignUp(true);
    setShowSignUpModal(true);
  };

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleFlagClick = async (country) => {
    try {
      const response = await fetch(`http://localhost:8000/articles/articles/${country.id}`);
      const articles = await response.json();
      setAnchorEl(null); // Close the menu after selection
      navigate('/destinations', { state: { articles, country } });
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  return (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button onClick={handleOpenSignUp} variant="outlined" size="small">Sign up</Button>
        <Typography
          component="h1"
          variant="h1"
          align="center"
          sx={{
            flex: 1,
            fontFamily: 'Gloria Hallelujah',
            fontWeight: 400,
            fontSize: '4.5rem',
            color: '#a6e3ac',
            mb: 3,
            mt: 2,
          }}
        >
          {title}
        </Typography>
        <IconButton></IconButton>
        <Button variant="outlined" size="small" onClick={handleOpenLogin}>Login</Button>
      </Toolbar>
      <Toolbar component="nav" variant="dense" sx={{ justifyContent: 'center', overflowX: 'auto' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', flexGrow: 1 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{
              '.Mui-selected': { color: '#323745', borderBottom: '3px solid #323745' },
              '.MuiTab-root': { textTransform: 'none', fontSize: '1rem', fontWeight: 500 },
            }}
          >
            {sections.map((section, index) => (
              <Tab
                key={section.title}
                label={section.title}
                component={NavLink}
                to={section.url}
                value={index}
                onMouseEnter={section.title === 'Destinations' ? handleMouseEnter : undefined}
                sx={{ p: 2, flexShrink: 0, mr: 4, '&:hover': { color: '#323745' } }}
              />
            ))}
          </Tabs>
        </Box>
      </Toolbar>
      {anchorEl && (
        <DestinationTabMenu
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          handleClose={handleClose}
          handleFlagClick={handleFlagClick}
        />
      )}
      <SignUpModal showModal={showSignUpModal} setShowModal={setShowSignUpModal} isSignUp={isSignUp} />
      <LoginModal showModal={showLoginModal} setShowModal={setShowLoginModal} />
    </>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
