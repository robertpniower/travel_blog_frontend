import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

function FeaturedPost(props) {
  const { post } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <Box sx={{
            position: 'absolute',
            backgroundColor: '#cacccb',
            height: 70,
            width: 70,
            borderRadius: '50%',
            top: 5,
            left: '50%',
            transform: 'translateX(-50%)',
            transition: 'transform 0.3s ease, opacity 0.3s ease', 
            '&:hover': {
              transform: 'translateX(-50%) scale(1.1)', 
              backgroundColor: "#bfbfbf", 
            },
          }}>
            <Box
              component="img"
              sx={{
                position: 'absolute',
                top: 5,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 65,
                height: 65,
                p: 0.3,
                borderRadius: '50%',
                border: '3px solid grey',

              }}
              src={post.image}
              alt="Kayak Icon"
            />
          </Box>
          <CardContent sx={{ flexGrow: 1, mt: 8, textAlign: 'center' }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ mt: 2 }}>
              {post.description}
            </Typography>

            <CardMedia
              component="img"
              sx={{
                width: '95%',
                height: 200,
                m: 2
              }}
              image={'/PANO_20240815_123117.jpg'}
              alt={post.imageLabel || 'Bottom image'}
            />
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    imageLabel: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
