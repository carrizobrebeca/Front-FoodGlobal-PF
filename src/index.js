// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Importa el Provider
import store from './store/store'; // Importa tu store
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Envuelve tu aplicación con Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
