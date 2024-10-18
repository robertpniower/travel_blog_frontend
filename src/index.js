import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';

import './index.css'; // Global styles if you have any

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
