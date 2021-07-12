import React from 'react';
import { render } from 'react-dom';
import { createTheme, MuiThemeProvider } from '@material-ui/core';
import App from './App';
import './i18n';
import './styles/App.global.css';
import '@fontsource/roboto';

window.require('dotenv').config();

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
});

render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
