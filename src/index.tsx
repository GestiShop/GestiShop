import React from 'react';
import { render } from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import '@fontsource/roboto';
import App from './App';
import './i18n';
import './styles/App.global.css';

const theme = createTheme({
  palette: {
    primary: {
      light: '#6D72C3',
      main: '#5941A9',
      dark: '#1D1128',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#FF7961',
      main: '#F44336',
      dark: '#BA000D',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: [
      // 'Roboto',
      'sans-serif',
    ].join(','),
  },
});

render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
