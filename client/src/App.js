import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, createTheme, ThemeProvider, Container } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';


import Home from './pages/Home';
import Users from './pages/Users';
import About from './pages/About'; // Example component for the About page
import Posts from './pages/Posts'; // Example component for the Posts page
import Destinations from './pages/Destinations'; // Example component for the Destinations page
import Travel from './pages/Travel'; // Example component for the Travel page

const fetchData = async () => {
  return {
    sections: [
      { title: 'Home', url: '/', component: Home },
      { title: 'Users', url: '/users', component: Users },
      { title: 'Posts', url: '/posts', component: Posts },
      { title: 'Destinations', url: '/destinations', component: Destinations },
      { title: 'Travel', url: '/travel', component: Travel },
      { title: 'About us', url: '/about', component: About },
    ],
  }
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
          <Header title="Wanderlust Abroad" sections={data.sections} />
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
                {/* Render the component for each section dynamically */}
                {data.sections.map((section) => (
                  <Route
                    key={section.title}
                    path={section.url}
                    element={<section.component />} // Render the component based on section data
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
