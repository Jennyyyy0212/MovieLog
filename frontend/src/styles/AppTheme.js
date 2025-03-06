// 📂 shared-theme/AppTheme.js
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // Can be 'dark' if using dark mode
    primary: {
      main: '#1976d2', // Blue primary color
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f4f4f4',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default function AppTheme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
