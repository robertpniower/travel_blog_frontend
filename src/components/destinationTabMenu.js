import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, Grid, CardMedia, Typography, Chip } from '@mui/material';
import { fetchCountries } from '../services/countryServices';

const DestinationTabMenu = ({ anchorEl, setAnchorEl, handleClose, handleFlagClick }) => {
  const [countries, setCountries] = useState([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
        console.log(countries)
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    getCountries();
  }, []);

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {countries.length > 0 ? (
        countries.map((country) => (
          <MenuItem key={country.country_code} onClick={() => handleFlagClick(country)}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Chip 
                  icon={<CardMedia
                  component="img"
                  alt={`Flag of ${country.country}`}
                  image={`https://flagsapi.com/${country.country_code}/flat/24.png`}
                  style={{ width: 40, height: 30 }}
                />}
                  label={<Typography variant="body1">{country.country}</Typography>}
                  sx={{
                    height: '4vh',
                    padding: 1
                
                  }}
               />
                  
                
              </Grid>

            </Grid>
          </MenuItem>
        ))
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Menu>
  );
};

export default DestinationTabMenu;

