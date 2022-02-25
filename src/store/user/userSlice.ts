import {
  ChangePasswordData,
  LoginData,
  RegisterData,
  RequestStatus,
  User
} from '@autonomo/common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setAuthToken } from 'http/authToken';
import {
  changePasswordRequest,
  getUserRequest,
  loginRequest,
  registerRequest
} from 'http/user';
import { RootState } from 'store';
import BaseInitialState, { getBaseInitialState } from '../BaseInitialState';

interface UserInitialState extends BaseInitialState {
  user: User;
  tokenExists: boolean;
}

const initialState: UserInitialState = {
  ...getBaseInitialState(),
  user: null,
  tokenExists: false
};

export const login = createAsyncThunk(
  'user/login',
  async (params: { loginData: LoginData }) => {
    const response = await loginRequest(params.loginData);
    return response.data;
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (params: { registerData: RegisterData }) => {
    const response = await registerRequest(params.registerData);
    return response.data;
  }
);

export const changePassword = createAsyncThunk(
  'user/change-password',
  async (params: { changePasswordData: ChangePasswordData }) => {
    const response = await changePasswordRequest(params.changePasswordData);
    return response.data;
  }
);

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
      .addCase(login.pending, (state) => {
        state.status = RequestStatus.loading;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = RequestStatus.succeeded;
        setAuthToken(action.payload.access_token);
        state.tokenExists = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = RequestStatus.failed;
        state.error = action.error.message;
      })
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
export const selectTokenExists = (state: RootState) => state.user.tokenExists;

export default userSlice.reducer;
