// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Importa el Provider
import store from "./store/store"; // Importa tu store
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from 'axios';


// axios.defaults.baseURL = 'http://localhost:3001';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="29682485940-7n1d9hgf8pdicimp1vkqn4j99jus0nr4.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
      
        <App />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

reportWebVitals();