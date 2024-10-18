import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography,  Box, Paper } from '@mui/material';

import axios from 'axios';

const Article = () => {
  const { articleId } = useParams(); // Get the articleId from the route parameters
  const [article, setArticle] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
      
        const articleResponse = await axios.get(`http://localhost:8000/posts/articles/${articleId}`);
        setArticle(articleResponse.data[0]);
      
        const postsResponse = await axios.get(`http://localhost:8000/posts/article/${articleId}/posts`);
        setPosts(postsResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchArticle();
  }, [articleId]);
  
  // Conditional rendering for loading and error states
  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    
      <Paper sx={{ p: 4 }}>
      <Box>
     
     <Box style={{ marginBottom: '20px' }}>
         <Typography variant="h1" marginBottom={3}>{article.title}</Typography>
         <Typography variant="body1">{article.content}</Typography>
     </Box>
 
   
   {posts.length > 0 ? (
     posts.map((post) => (
       <Box key={post.id} style={{ marginBottom: '20px' }}>
         <Typography variant="h5" marginBottom={3}>{post.title}</Typography>
         <Typography variant="body1">{post.content}</Typography>
        
       </Box>
     ))
   ) : (
     <Typography variant="body2">No related posts found.</Typography>
   )}

   </Box>

      </Paper>
      
      
  
  );
};

export default Article;
