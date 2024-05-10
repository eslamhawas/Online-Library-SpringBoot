import React from 'react';
// import { Provider } from 'react-redux';
// Boostrap
import 'bootstrap/dist/css/bootstrap.css'
import ReactDOM from 'react-dom/client';
import App from './App';
// import store from './states/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Provider store={store}>
    <App />
  // </Provider>
);


