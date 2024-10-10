
import React, { useState, useEffect } from 'react';
import { fetchArticles } from '../services/aricleServices';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import MainFeaturedPost from '../components/MainFeaturedPost';
import FeaturedPost from '../components/FeaturedPost';


const Home = () => {
  const [articles, setArticles] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const articlesWithIcons = await fetchArticles();
        setArticles(articlesWithIcons);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <main>
      <MainFeaturedPost />
      <Grid container spacing={5} sx={{ mt: 3 }}>
        {articles.map((article) => (
          <FeaturedPost  
          key={article.id} post={article}/>
        ))}
      </Grid>
    </main>
  );
};

export default Home;
