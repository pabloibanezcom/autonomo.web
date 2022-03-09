import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { RootState } from 'store';

interface statusInitialState {
  loading: boolean;
  error: SerializedError;
  redirectUrl: string;
}

const initialState: statusInitialState = {
  loading: false,
  error: null,
  redirectUrl: null
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    setError(state, action: PayloadAction<SerializedError>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setRedirectUrl(state, action: PayloadAction<string>) {
      state.redirectUrl = action.payload;
    },
    clearRedirecttUrl(state) {
      state.redirectUrl = null;
    }
  }
});

export const selectLoading = (state: RootState) => state.status.loading;
export const selectError = (state: RootState) => state.status.error;
export const selectRedirectUrl = (state: RootState) => state.status.redirectUrl;

export const {
  startLoading,
  stopLoading,
  setError,
  clearError,
  setRedirectUrl,
  clearRedirecttUrl
} = statusSlice.actions;

export default statusSlice.reducer;
