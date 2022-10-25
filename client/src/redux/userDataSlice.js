import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// +++++++++===================++++++++++
// ACTIONS for userData slice 
// +++++++++===================++++++++++

export const fetchUserData = createAsyncThunk(
    'userData/fetchUserData',
    async (username) => {
        const response = await axios.get(`http://localhost:3001/api/user/get-info/${username}`, { withCredentials: true });
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
    async (userAuthInfo, { rejectWithValue }) => {
        // Ask the server to login the user. See /server/APIrouter.js and /server/mockAPI.js to see how this works.
        try {
            const response = await axios.post(
                `http://localhost:3001/api/user/login`,
                {username: userAuthInfo.username, password: userAuthInfo.password}, { withCredentials: true }
            );
            return response.data;
        } 
        catch (error) 
        {
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
            return rejectWithValue(error.toJSON()) 
        }
    }
);
  // Logs out the user and then empties user data in the global state.
export const logoutUser = createAsyncThunk(
    'userData/logoutUser',
    async () => {
        // Ask the server to logout the user.
        const response = await axios.post(`http://localhost:3001/api/user/logout`, { withCredentials: true });
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
            //state.userInfo = {...action.payload};
            state.userInfo.full_name = action.payload.full_name;
            state.userInfo.age = action.payload.age;
            state.status = "success";
        })
        .addCase(fetchUserData.rejected, (state) => {
            state.status = "failed";
        })
    }
});
