
import React from 'react';
import { Grid } from '@mui/material';
import MainFeaturedPost from '../components/MainFeaturedPost';
import FeaturedPost from '../components/FeaturedPost';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';

const Home = ({ data }) => {
  const { mainFeaturedPost, featuredPosts, posts, sidebar } = data;

  return (
    <main>
      <MainFeaturedPost post={mainFeaturedPost} />
      <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid>
      <Grid container spacing={5} sx={{ mt: 3 }}>
        <Main title="From the firehose" posts={posts} />
        <Sidebar
          title={sidebar.title}
          description={sidebar.description}
          archives={sidebar.archives}
        />
      </Grid>
    </main>
  );
};

export default Home;