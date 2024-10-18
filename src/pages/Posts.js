import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Grid, Card, CardContent, CardMedia, CardActionArea, Tooltip } from '@mui/material';
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
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
      }
    };
    fetchPosts();
  }, []);

  const handleOpenArticleForm = () => {
    navigate('/article-form');
  };

  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <Box elevation={2} sx={{ p: 3 }}>
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between" 
        sx={{ mb: 2 }}
      >
        <Typography variant="h3" gutterBottom align="center" sx={{ flexGrow: 1 }}>
          Articles
        </Typography>
        <Tooltip
          title="Add Article"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: '#1976d2',
                color: '#fff',
                fontSize: '1rem',
                borderRadius: '8px',
                padding: '8px 16px'
              },
            },
            arrow: {
              sx: {
                color: '#1976d2',
              },
            },
          }}
        >
          <IconButton
            color="primary"
            onClick={handleOpenArticleForm}
            sx={{ 
              backgroundColor: 'primary.light', 
              '&:hover': { backgroundColor: 'primary.main' } 
            }}
            aria-label="create post"
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ borderBottom: 2, borderColor: 'divider', flexGrow: 1, mb: 4 }} />

      <Grid container spacing={3}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id} display="flex" mt={4}>
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
                  sx={{
                    width: '95%',
                    height: 200,
                    m: 2
                  }}
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
        ))}
      </Grid>
    </Box>
  );
}
