import './App.css';
import { Outlet } from 'react-router-dom';
import React from 'react';
import MainNavbar from './components/MainNavbar';
import ErrorBoundary from './components/ErrorBoundary';

// ================================
/*
  This is used to check if you have mutltiple reacts installed. 
  Having multiple reacts installed will cause errors with Redux.
  if this logs false the app will no longer work.
  If it logs false onse solution is to delete all your global react and redux and redux/toolkit modules.
  To test this
  Uncomment the code below and add window.React1 = require('react'); to /node_modules/react-dom/index.js
*/
// Do not delete this code please.
/*
require('react-dom');
window.React2 = require('react');
console.log("Multiple Reacts installed? " + window.React1 === window.React2);
*/
// ================================

// This is the global component

function App() {

  /*
  The <Outlet /> component places all the components created 
  from routing in the outlet component. See index.js for the routing paths, and their accociated components.
  Thus every component will render inside the <div></div> of the App component. See index.js for more info.
  */

  return (
      <div className="App">
        <ErrorBoundary>
          <MainNavbar />
        </ErrorBoundary>
        <Outlet />
      </div>
  );
}

export default App;

