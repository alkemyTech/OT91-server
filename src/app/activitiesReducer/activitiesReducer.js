import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as activityService from '../../Services/activityService';

export const getAll = createAsyncThunk("activities/getAll", activityService.getAll);
export const getById = createAsyncThunk('activities/getById', activityService.getById);
export const create = createAsyncThunk('activities/create', activityService.create);
export const update = createAsyncThunk('activities/update', activityService.update);
export const deleteById = createAsyncThunk('activities/delete', activityService.deleteById);
export const createOrUpdate = createAsyncThunk('activities/createOrupdate', activityService.createOrUpdate);

const activitiesSlice = createSlice({
    name:"activitiesReducer",
    initialState: {
        activities: [],
        activity: {},
        status: ''
    },
    extraReducers: {
        [getAll.pending]: (state) => { state.status = 'loading' },
        [getAll.fulfilled]: (state, action) => {
            state.status = 'success';
            console.log(action)
            state.activities = action.payload;
        },
        [getAll.rejected]: (state) => { state.status = 'failed' },
        [getById.pending]: (state) => { state.status = 'loading' },
        [getById.fulfilled]: (state, action) => {
            state.status = 'success';
            state.activity |= action.payload;
        },
        [getById.rejected]: (state) => { state.status = 'failed' },
        [deleteById.pending]: (state) => { state.status = 'loading' },
        [deleteById.fulfilled]: (state, action) => {
            state.status = 'success';
            state.activities = state.activities.filter(deletedActivity => deletedActivity.id != action.meta.arg);
        },
        [deleteById.rejected]: (state) => { state.status = 'failed' },
        [create.pending]: (state) => { state.status = 'loading' },
        [create.fulfilled]: (state, action) => {
            state.status = 'success';
            state.activities = [...state.activities, action.payload];
        },
        [create.rejected]: (state) => { state.status = 'failed' },
        [update.pending]: (state) => { state.status = 'loading' },
        [update.fulfilled]: (state, action) => {
            state.status = 'success';
            const updatedActivityIndex = state.activities.findIndex(activity => activity.id == action.payload.id);
            state.activities[updatedActivityIndex] = action.payload;
        },
        [update.rejected]: (state) => { state.status = 'failed' },
        [createOrUpdate.pending]: (state) => { state.status = 'loading'},
        [createOrUpdate.fulfilled]: (state, action) => {
            state.status = 'success';
            getAll(action.payload.id);
        },
        [createOrUpdate.rejected]: (state) => { state.status = 'failed' }
    }
});

export default activitiesSlice.reducer;
