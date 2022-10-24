import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
            );

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
});
