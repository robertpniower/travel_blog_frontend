import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Grid, Card, CardContent, CardMedia, CardActionArea, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Destination() {
  const location = useLocation();
  const { articles = [] } = location.state || {}; // Default to an empty array if articles is undefined
  const country = location.state?.country || {};  // Default to an empty object if country is undefined
  const navigate = useNavigate();

  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  const handleOpenArticleForm = () => {
    navigate('/article-form');
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
          Travel Guide {country.country || ''} {/* Fallback to 'Unknown Country' */}
        </Typography>
        <Tooltip
          title="Add Article"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: '#85a1ed',
                color: 'secondary.dark',
                fontSize: '1rem',
                borderRadius: '8px',
                padding: '8px 16px'
              },
            },
            arrow: {
              sx: {
                color: '#85a1ed',
              },
            },
          }}
        >
          <IconButton
            color="secondary.dark"
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
        {articles.length > 0 ? (
          articles.map((article) => (
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
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary" align="center">
              No articles available.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default Destination;
