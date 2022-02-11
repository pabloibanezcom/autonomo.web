import { RequestStatus, User } from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserRequest } from '../../http';
import BaseInitialState, { getBaseInitialState } from '../BaseInitialState';
import { RootState } from '../store';

interface UserInitialState extends BaseInitialState {
  user: User;
}

const initialState: UserInitialState = { ...getBaseInitialState(), user: null };

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await getUserRequest();
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      });
  }
});

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
