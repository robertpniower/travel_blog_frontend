
import React, { useState, useEffect } from 'react';

import { Grid } from '@mui/material';
import MainFeaturedPost from '../components/MainFeaturedPost';
import FeaturedPost from '../components/FeaturedPost';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';


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

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };
    getData();
  }, []);

  if (!data) return <div>Loading...</div>;
  return (
    <main>
      <MainFeaturedPost post={data.mainFeaturedPost} />
      <Grid container spacing={5} sx={{ mt: 3 }}>
        {data.featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>
      <Grid container spacing={5} sx={{ mt: 3 }}>
        
        <Sidebar
          title={data.sidebar.title}
          description={data.sidebar.description}
          archives={data.sidebar.archives}
        />
      </Grid>
    </main>
  );
};

export default Home;