import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  positions, Provider as AlertProvider } from 'react-alert'
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import AlertTemplate from './Components/AlertTemplate/AlertTemplate'
import reportWebVitals from './reportWebVitals';
import { UserContextProvider } from './Context/UserContextProvider';

const options = {
  timeout: 2000,
  position: positions.TOP_CENTER,


};

ReactDOM.render(
 
  <BrowserRouter>
   <AlertProvider template={AlertTemplate} {...options}>
    <UserContextProvider>
    <App />
    </UserContextProvider>
    </AlertProvider>
    </BrowserRouter>
,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
