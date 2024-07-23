import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container, createTheme, ThemeProvider, Grid } from '@mui/material';
import Header from './components/Header';
import MainFeaturedPost from './components/MainFeaturedPost';
import FeaturedPost from './components/FeaturedPost';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import post1 from './posts/blog-post.1.md';
import post2 from './posts/blog-post.2.md';
import post3 from './posts/blog-post3.md';

const sections = [
  { title: 'Home', url: '/' },
  { title: 'Design', url: '/design' },
  { title: 'Culture', url: '/culture' },
  { title: 'Business', url: '/business' },
  { title: 'Politics', url: '/politics' },
  { title: 'Opinion', url: '/opinion' },
  { title: 'Science', url: '/science' },
  { title: 'Health', url: '/health' },
  { title: 'Style', url: '/style' },
  { title: 'Travel', url: '/travel' },
];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
];

const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
  ],
};

const defaultTheme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="lg">
          <Header title="Travel Blog" sections={sections} />
          <Routes>
            <Route
              path="/"
              element={
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
              }
            />
            {sections.map((section) => (
              <Route key={section.title} path={section.url} element={<Main title={section.title} posts={posts} />} />
            ))}
          </Routes>
        </Container>
        <Footer
          title="Footer"
          description="Something here to give the footer a purpose!"
        />
      </Router>
    </ThemeProvider>
  );
}
