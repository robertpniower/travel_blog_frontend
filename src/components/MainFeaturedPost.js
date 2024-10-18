import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const fetchData = async () => {
  return {
    mainFeaturedPost: {
      title: 'Exploring the Wonders of the World',
      description:
        "Discover the most amazing places around the globe. Dive into travel stories, tips, and much more!",
      image: '/PANO_20240815_123117.jpg',
      imageText: 'main image description',
      linkText: 'Continue reading…',
    },
  };
};

function MainFeaturedPost() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result.mainFeaturedPost); // Set the mainFeaturedPost directly to data
    };
    getData();
  }, []);

  // Check if data is null and return a loading state or fallback UI
  if (!data) {
    return <Typography>Loading...</Typography>; // You can customize this as needed
  }

  return (
    <div>
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          height: '500px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${data.image})`, // Accessing data.image is now safe
        }}
      >
        {<img style={{ display: 'none' }} src={data.image} alt={data.imageText} />}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.3)',
          }}
        />
        <Grid container sx={{ height: '100%' }} justifyContent="center" alignItems="center">
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
              }}
            >
              <Typography
                component="h1"
                variant="h1"
                color="inherit"
                gutterBottom
                sx={{ 
                  fontWeight: 'bold',
                  fontFamily: 'Merriweather'
                }}
              >
                {data.title}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Box
        sx={{
          position: 'relative',
          pt: 3,
          m: 3,
          height: '100px',
          borderBottom: '1px solid #000',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            sx={{
              fontFamily: 'Merriweather',
              fontStyle: 'italic',
            }}
          >
            {data.description}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPost;
