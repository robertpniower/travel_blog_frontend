import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


function MainFeaturedPost(props) {
  const { post } = props;

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
          backgroundImage: `url(${post.image})`,
        }}
      >
        {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
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
                {post.title}
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
            textAlign: 'center'
          }}
        >

        
            <Typography
              component="h1"
              variant="h6"
              sx={{

                fontFamily: 'Merriweather',
                fontStyle: 'italic'
              }}
            >
              {post.description}
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
