//Load libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
//Load css
import './index.css';
//Load React components
import App from './App';
import NotFound from './components/NotFound';
import RegistrationContainer from './components/RegistrationContainer';
import ForgotPasswordContainer from './components/ForgotPasswordContainer';
import DashboardPage from './components/DashboardPage';
import AddEntryPage from './components/AddEntryPage';
import ViewEntriesPage from './components/ViewEntriesPage';

/*
  The Main Routing file for this app  

  The "*" path will match only when no other routes do. (Redirect to 404 page not found)
  When routes are nested the UI should be nested too. Meaning the parent UI will still display
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />} > 
  
          </Route>
          <Route path="/register" element={<RegistrationContainer />}  />
          <Route path="/forgot-password" element={<ForgotPasswordContainer />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/add-entry" element={<AddEntryPage />} />
          <Route path="/view-entries" element={<ViewEntriesPage />} />
          <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
