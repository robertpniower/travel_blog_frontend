import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#85a1ed',
        
      },
      secondary: {
        main: '#7e828f',
        dark: '#40434a'
      },
      error: {
        main: '#ed9e9a'
      },
      success: {
        main: '#a6e3ac'
  
      }
    },
    typography: {
      h1: {
        fontSize: '3rem',
        '@media (max-width:600px)': {
          fontSize: '2rem'
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

  export default defaultTheme;