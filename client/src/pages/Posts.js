import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, IconButton, Grid, Card, CardContent, CardMedia, CardActionArea, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Posts() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/articles/articles');
        setArticles(response.data); // Set articles to the response data
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]); // Set articles to an empty array on error
      }
    };
    fetchPosts();
  }, []);

  const handleOpenArticleForm = () => {
    navigate('/article-form'); // Change this to the correct path for your article form page
  };

  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`); // Navigate to the article page with articleId as a param
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box textAlign="right" sx={{ mb: 2 }}>
      <Tooltip 
          title="Add Article" 
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: '#1976d2', // Custom background color for tooltip
                color: '#fff', // Text color
                fontSize: '1rem', // Font size
                borderRadius: '8px', // Rounded corners
                padding: '8px 16px', // Custom padding
              },
            },
            arrow: {
              sx: {
                color: '#1976d2', // Match the arrow color with the tooltip background
              },
            },
          }}
        >
        <IconButton
          color="primary"
          onClick={handleOpenArticleForm} // Call the new function here
          sx={{ backgroundColor: 'primary.light', '&:hover': { backgroundColor: 'primary.main' } }}
          aria-label="create post"
        >
          <AddIcon />
        </IconButton>
        </Tooltip>
        
      </Box>

      <Typography variant="h4" gutterBottom align="center">
        Articles
      </Typography>

      <Grid container spacing={3}>
        {articles.map((article) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={article.id} display="flex">
              <CardActionArea>
              <Card
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%'
                }}
                onClick={() => handleArticleClick(article.id)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={article.image || '/PANO_20240815_123117.jpg'}
                  alt={article.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.content}
                  </Typography>
                </CardContent>
              </Card>
              </CardActionArea>
              
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}
