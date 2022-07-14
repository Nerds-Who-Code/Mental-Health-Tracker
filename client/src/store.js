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

//Logs in the user and then stores the user data in global state.
export const loginUser = createAsyncThunk(
    'userData/loginUser',
    //If there is more than 1 argument. 
    //Then the arguments to the action need to be wrapped up in a single object 
    //Because this function only accepts 1 argument.
    async (data) => {
        //Ask the server to login the user. See /server/APIrouter.js and /server/mockAPI.js to see how this works.
        const response = await axios.put(`http://localhost:3001/api/loginUser/${data.username}`,
                {password: data.password});
        return await response.data;
    }
);

//Logs out the user and then empties useer data in the global state.
export const logoutUser = createAsyncThunk(
    'userData/logoutUser',
    async (username) => {
        //Ask the server to logout the user. See /server/APIrouter.js and /server/mockAPI.js to see how this works.
        const response = await axios.put(`http://localhost:3001/api/updateUser/${username}`,
                {property: 'isLoggedIn',
                value: 'false'});
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
                //Set the state equal to the data received from the action.
                state.userInfo = action.payload;
                state.status = "success";
            })
            .addCase(loginUser.rejected, (state) => {
                state.status = "failed";
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
        console.log("-->" + username);
        //Ask the server to logout the user. See /server/APIrouter.js and /server/mockAPI.js to see how this works.
        const response = await axios.get(`http://localhost:3001/api/getAllEntries/${username}`);
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

