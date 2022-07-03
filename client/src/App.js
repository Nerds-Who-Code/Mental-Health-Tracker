//import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';

//This is the global component

//Every component will render inside the <div></div> of the App component. See index.js for more info.
function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
