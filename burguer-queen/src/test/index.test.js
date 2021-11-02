import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import theme from '../assets/themeConfig.js';
import { ThemeProvider } from '@mui/material/styles';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Application root', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    div.id = 'root';
    document.body.appendChild(div);
    require('../index.js');
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>,
      div
    );
  });
});
