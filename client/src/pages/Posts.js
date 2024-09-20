import React, { useEffect, useState } from 'react';
import { Box, Typography,  Paper, Button, Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import SignUpModal from '../components/signUpModal';
import { textAlign } from '@mui/system';

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
      featuredPosts: [
        {
          title: 'A Journey through the Alps',
          date: 'Aug 18',
          description:
            'An unforgettable experience in the heart of Europe. From snow-capped peaks to lush valleys, explore the beauty of the Alps.',
          image: '/icons/002-hiking.png',
          imageLabel: 'Image Text',
        },
        {
          title: 'Exploring the Amazon Rainforest',
          date: 'Jul 24',
          description:
            'Discover the biodiversity and adventure of the Amazon. A trek into the wild that you’ll never forget.',
          image: '/icons/009-map.png',
          imageLabel: 'Image Text',
        },
      ],
      posts: [
        'Post content for travel-related story 1',
        'Post content for travel-related story 2',
        'Post content for travel-related story 3',
      ],
      sidebar: {
        title: 'About',
        description:
          'This travel blog is dedicated to sharing experiences from all around the world. Whether you are looking for inspiration for your next trip or just want to enjoy amazing stories, you’ve come to the right place!',
        archives: [
          { title: 'March 2024', url: '#' },
          { title: 'February 2024', url: '#' },
          { title: 'January 2024', url: '#' },
        ],
      },
    };
  };

export default function Posts() {
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom align="center">
        Posts
    </Typography>
    <TableContainer>
       
    </TableContainer>
    
</Paper>
  )
}
