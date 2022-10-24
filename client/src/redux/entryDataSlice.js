import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logoutUser } from './userDataSlice.js';

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
export const entryDataSlice = createSlice(
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
});
