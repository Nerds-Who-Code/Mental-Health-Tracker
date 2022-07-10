import './App.css';
import { Outlet } from 'react-router-dom';
import React from 'react';

//This is the global component

function App() {

  /*
  The <Outlet /> component places all the components created 
  from routing in the outlet component. See index.js for the routing paths, and their accociated components.
  Thus every component will render inside the <div></div> of the App component. See index.js for more info.
  */

  return (
      <div className="App">
        <Outlet />
      </div>
  );
}

export default App;
