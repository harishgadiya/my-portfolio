import React from 'react';
import ReactDOM from 'react-dom/client'; // Use `react-dom/client`
import App from './App';

// Create root using createRoot and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
