import {
  ChangePasswordData,
  LoginData,
  RegisterData,
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
import { simplifyError } from 'util/error';
import {
  clearError,
  setError,
  setRedirectUrl,
  startLoading,
  stopLoading
} from '../status/statusSlice';

interface UserInitialState {
  user: User;
}

const initialState: UserInitialState = {
  user: null
};

export const login = createAsyncThunk(
  'user/login',
  async (params: { loginData: LoginData }, { dispatch, getState }) => {
    dispatch(startLoading());
    try {
      const response = await loginRequest(params.loginData);
      dispatch(stopLoading());
      const state = getState() as RootState;
      if (state.status.error) {
        dispatch(clearError());
      }
      dispatch(setRedirectUrl('/'));
      return response.data;
    } catch (err: unknown) {
      dispatch(stopLoading());
      dispatch(setError(simplifyError(err)));
      throw err;
    }
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
      .addCase(login.fulfilled, (state, action) => {
        setAuthToken(action.payload.access_token);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
