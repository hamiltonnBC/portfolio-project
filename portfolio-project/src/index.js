import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './global.css';


console.log('Public URL:', process.env.PUBLIC_URL);
console.log('Node Env:', process.env.NODE_ENV);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

console.log('Index.js is running');
