import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// The Global State Logic of the app. Implemented with React Redux and Redux Toolkit

// +++++++++===================++++++++++
// ACTIONS for userData slice 
// +++++++++===================++++++++++

export const fetchUserData = createAsyncThunk(
  'userData/fetchUserData',
  async (username) => {
    const response = await axios.get(`http://localhost:3001/api/getUser/${username}`);
    return await response.data;
  }
);

// Logs in the user and then stores the user data in global state.
export const loginUser = createAsyncThunk(
  'userData/loginUser',
  // If there is more than 1 argument. 
  // Then the arguments to the action need to be wrapped up in a single object. 

  /**
   * @note called with 2 parameters (arg: any, thunkAPI?: Object)
   * @link https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator
   */
  async (data, { rejectWithValue }) => {
    // Ask the server to login the user. See /server/APIrouter.js and /server/mockAPI.js to see how this works.
    try {
      const response =
        await axios.put(
          `http://localhost:3001/api/loginUser/${data.username}`,
          { password: data.password }
        )

      return response.data;
    } catch (error) {
      // Makes error available as action.payload in loginUser.reject 
      // and for dispatch().unwrap().catch(error => { /* do smth here */}) in LoginContainer
      /**
       * @todo make error a plain object so that Redux is happy. call AxiosError.toJSON()  
       *   
       *  "Redux only checks that every action is a plain object" - see link below
       * 
       * @link https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants
       * 
       */
      // return rejectWithValue(error.toJSON()) 
      return rejectWithValue(JSON.stringify(error))
    }
  }
);

// Logs out the user and then empties user data in the global state.
export const logoutUser = createAsyncThunk(
  'userData/logoutUser',
  async (username) => {
    // Ask the server to logout the user. See /server/APIrouter.js and /server/mockAPI.js to see how this works.
    const response = await axios.put(`http://localhost:3001/api/updateUser/${username}`,
      {
        property: 'isLoggedIn',
        value: 'false'
      });
    return await response.data;
  }
);

// ===================
//   userData Slice
// ===================

// The 'slice' or part of the global state handling the global user state
export const userDataSlice = createSlice(
  {
    name: 'userData',
    initialState: {
      userInfo: {},
      status: null
    },
    extraReducers: (builder) => {
      builder.addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
        .addCase(loginUser.fulfilled, (state, action) => {
          // Set the state equal to the data received from the action.
          console.log(`fulfilled: ${JSON.stringify(action, null, 4)}`)
          state.userInfo = { ...action.payload, isLoggedIn: true };
          state.status = "success";
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.status = "failed";
          state.error = JSON.stringify(action.payload, null, 4); // store error from API 
        })
        // If you set this to fulfilled you need to click the logout button twice to go back to the dashboard.
        // There is no reason to wait for response to fulfill, since user is logged out server side without (usable) return data.
        .addCase(logoutUser.pending, (state) => {
          state.userInfo = {};
          state.status = null;
        })
        .addCase(fetchUserData.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
          state.userInfo = action.payload;
          state.status = "success";
        })
        .addCase(fetchUserData.rejected, (state) => {
          state.status = "failed";
        })
    }
  }
);

// +++++++++===================++++++++++
// ACTIONS for entryData slice 
// +++++++++===================++++++++++

// Fetch the entries from the server and store in global state
export const fetchEntries = createAsyncThunk(
  'userData/fetchEntries',
  async (username) => {
    // Ask the server fetch all entries from the user. See /server/APIrouter.js and /server/mockAPI.js to see how this works.
    const response = await axios.get(`http://localhost:3001/api/getAllEntries/${username}`);
    return await response.data;
  }
);

// Delete entry from the server and store the updated entries in global state
export const addEntry = createAsyncThunk(
  'userData/addEntry',
  // If there is more than 1 argument. 
  // Then the arguments to the action need to be wrapped up in a single object 
  // Because this function only accepts 1 argument.
  async (data) => {
    // Ask the server add an entry See /server/APIrouter.js and /server/mockAPI.js to see how this works.
    const response = await axios.post(`http://localhost:3001/api/addEntry/${data.username}`,
      { entry: data.entry });
    return await response.data;
  }
);

// Delete entry from the server and store the updated entries in global state
export const deleteEntry = createAsyncThunk(
  'userData/deleteEntry',
  async (data) => {
    // Ask the server to delete an entry. See /server/APIrouter.js and /server/mockAPI.js to see how this works.
    // The entryID of the deleted entry is send back as a result. Which is used to update the state.
    const response = await axios.delete(`http://localhost:3001/api/deleteEntry/${data.username}/${data.entryId}`);
    return await response.data;
  }
);

// ===================
//   entryData Slice
// ===================

// The 'slice' or part of the global state handling the global entry state
export const entryData = createSlice(
  {
    name: 'entryData',
    initialState: {
      entryInfo: [],
      status: null
    },
    extraReducers: (builder) => {
      builder.addCase(fetchEntries.pending, (state) => {
        state.status = "loading";
      })
        .addCase(fetchEntries.fulfilled, (state, action) => {
          state.entryInfo = action.payload;
          state.status = "success";
        })
        .addCase(fetchEntries.rejected, (state) => {
          state.status = "failed";
        })
        .addCase(addEntry.pending, (state) => {
          state.status = "loading";
        })
        .addCase(addEntry.fulfilled, (state, action) => {
          //Add the newly created entry to the global state
          state.entryInfo.push(action.payload);
          state.status = "success";
        })
        .addCase(addEntry.rejected, (state) => {
          state.status = "failed";
        })
        .addCase(deleteEntry.pending, (state) => {
          state.status = "loading";
        })
        .addCase(deleteEntry.fulfilled, (state, action) => {
          //Delete the entry from the global state
          state.entryInfo = state.entryInfo.filter((entry) => entry.entryId !== action.payload);
          state.status = "success";
        })
        .addCase(deleteEntry.rejected, (state) => {
          state.status = "failed";
        })
        // Make sure the entry data is also cleared when the user logs out
        .addCase(logoutUser.pending, (state) => {
          state.entryInfo = [];
          state.status = null;
        })
    }
  }
);

// +++ The actual Global State +++
// This global state combines all the partial global stats called 'slices' into the final combined global state
const store = configureStore(
  {
    reducer: {
      userData: userDataSlice.reducer,
      entryData: entryData.reducer
    }
  }
);
export default store;

