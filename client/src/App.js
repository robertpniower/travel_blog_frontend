import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, createTheme, ThemeProvider, Container } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Home from './pages/Home';
import Users from './pages/Users';

const fetchData = async () => {
  return {
    sections: [
      { title: 'Home', url: '/' },
      { title: 'Users', url: '/users' },
      { title: 'Destinations', url: '/destinations' },
      { title: 'Travel', url: '/travel' },
      { title: 'About', url: '/about' },
    ],
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

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    h1: {
      fontSize: '3rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      '@media (max-width:600px)': {
        fontSize: '1.8rem',
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '0px',
        },
      },
    },
  },
});

export default function App() {
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
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header title="Travel Blog" sections={data.sections} />
          <main style={{ flex: 1 }}>
            <Container
              sx={{
                width: '100%',
                padding: '16px',
                transition: 'max-width 0.3s ease-in-out',
                '@media (min-width: 1920px)': {
                  maxWidth: '1440px', 
                  margin: '0 auto',
                },
                '@media (max-width: 1920px)': {
                  maxWidth: '100%',
                  margin: '0', 
                },
              }}
            >
              <Routes>
                <Route path="/" element={<Home data={data} />} />
                <Route path="/users" element={<Users title={'Users'} />} />
                {data.sections.map((section) => (
                  <Route
                    key={section.title}
                    path={section.url}
                    element={<Main title={section.title} posts={data.posts} />}
                  />
                ))}
              </Routes>
            </Container>
          </main>
          <Footer title="Footer" description="Something here to give the footer a purpose!" />
        </div>
      </Router>
    </ThemeProvider>
  );
}
