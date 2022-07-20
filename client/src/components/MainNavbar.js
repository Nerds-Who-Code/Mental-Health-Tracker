import React, {useState, useEffect, useRef} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from "react-router-dom";
import {Transition} from "@headlessui/react";
import {logoutUser} from '../store';

function MainNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get user data from global state
  const userDataGlobalState = useSelector(state => state.userData.userInfo);
  // Open or closed state of the navbar
  const [isOpen, setIsOpen] = useState(false);
  // Check if the user is logged in or not.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // I dont know what this does. :-)
  const divRef = useRef();

    // Check if the user is logged in. 
    useEffect( () => {
      // Check if user data in global state is empty. (non logged in user.)
      if(JSON.stringify(userDataGlobalState) === '{}') {
        setIsLoggedIn(false);
      }
      // User is logged in
      else if (userDataGlobalState.isLoggedIn === "true" ||
               userDataGlobalState.isLoggedIn === true)
      {
        setIsLoggedIn(true);
      }
  }, [userDataGlobalState]);

  // Open and close the navbar
  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  // Log out code
  const logOut = () => {
    
    if (window.confirm("Are you sure you want to log out?") === true) {
      dispatch(logoutUser(userDataGlobalState.username));
      // Navigate back to the main page.
      navigate("/");
    }
    //user does not really want to logout. Cancel the function. 
    else {
      return 0;
    }
  };

  // We are going to render 2 types of navbars, based on if the user is logged in or logged out.
  // Each navbar also has a mobile version. So in total there are 4 navbars.

  // Navbar for logged out user.
  if (isLoggedIn === false) {
    return ( 
    <nav className="bg-blue-500">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {/* <!-- NAVBAR LOGO --> */}
            <img
              className="h-8 w-8"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className=" hover:bg-blue-400 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>

              <Link
                to="/resources"
                className="text-blue-100 hover:bg-blue-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Resources
              </Link>
              <Link
                to="/about"
                className="text-blue-100 hover:bg-blue-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/"
                className="text-blue-100 hover:bg-blue-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="-mr-2 flex md:hidden">
          <button
            onClick={toggleNavBar}
            type="button"
            className="bg-blue-800 inline-flex items-center justify-center p-2 rounded-md text-blue-400 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>

    <Transition
      show={isOpen}
      enter="transition ease-out duration-100 transform"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75 transform"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      {(divRef) => (
        <div className="md:hidden" id="mobile-menu">
          <div ref={divRef} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>

            <Link
              to="/resources"
              className="text-blue-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Resources
            </Link>

            <Link
              to="/about"
              className="text-blue-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>

            <Link
              to="/"
              className="text-blue-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </Transition>
  </nav>
  );
  }

  // Navbar for logged in user.
  else if (isLoggedIn === true) {
    return ( 
    <nav className="bg-blue-500">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="flex-shrink-0">
             {/* <!-- NAVBAR LOGO --> */}
            <img
              className="h-8 w-8"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
              alt="Workflow"
            />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/dashboard"
                className=" hover:bg-blue-400 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>

              <Link
                to="/resources"
                className="text-blue-100 hover:bg-blue-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Resources
              </Link>
              <Link
                to="/about"
                className="text-blue-100 hover:bg-blue-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </Link>
              <button
                className="text-blue-100 hover:bg-blue-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={logOut}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="-mr-2 flex md:hidden">
          <button
            onClick={toggleNavBar}
            type="button"
            className="bg-blue-800 inline-flex items-center justify-center p-2 rounded-md text-blue-400 hover:text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>

    <Transition
      show={isOpen}
      enter="transition ease-out duration-100 transform"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-75 transform"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      {(divRef) => (
        <div className="md:hidden" id="mobile-menu">
          <div ref={divRef} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/dashboard"
              className="hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </Link>

            <Link
              to="/resources"
              className="text-blue-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Resources
            </Link>

            <Link
              to="/about"
              className="text-blue-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>

            <button
              className="text-blue-300 hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={logOut}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </Transition>
  </nav>
  );
  }
}

export default MainNavbar;

// Temporally disabled code

// <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//         </div>
//       </header>
//       <main>
//         <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//           {/* <!-- Replace with your content --> */}
//           <div className="px-4 py-6 sm:px-0">
//             <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
//           </div>
//           {/* <!-- /End replace --> */}
//         </div>
//       </main>
//     </div>

