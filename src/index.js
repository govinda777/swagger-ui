import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';


const isProduction = process.env.NODE_ENV === 'production';

ReactDOM.render(
  <BrowserRouter basename={isProduction ? '/swagger-ui' : '/'}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
