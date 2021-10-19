import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import App from './App';
import {theme} from '../src/assets/themeConfi';
import { ThemeProvider } from '@material-ui/styles';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
