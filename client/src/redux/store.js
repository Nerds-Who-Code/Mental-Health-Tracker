import { configureStore } from '@reduxjs/toolkit';
//Import the data slices
import { userDataSlice } from './userDataSlice.js';
import { entryDataSlice } from './entryDataSlice.js';

// The Global State Logic of the app. Implemented with React Redux and Redux Toolkit

// This global state combines all the partial global states called 'slices' into the final combined global state
const store = configureStore(
  {
    reducer: {
      userData: userDataSlice.reducer,
      entryData: entryDataSlice.reducer
    }
  }
);

export default store;
