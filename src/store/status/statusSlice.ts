import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { MessageTitle } from 'interfaces';
import { RootState } from 'store';

interface statusInitialState {
  loading: boolean;
  messageTitle: MessageTitle;
  error: SerializedError;
  redirectUrl: string;
}

const initialState: statusInitialState = {
  loading: false,
  messageTitle: null,
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
    setMessageTitle(state, action: PayloadAction<MessageTitle>) {
      state.messageTitle = action.payload;
    },
    clearMessageTitle(state) {
      state.messageTitle = null;
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
export const selectMessageTitle = (state: RootState) =>
  state.status.messageTitle;
export const selectError = (state: RootState) => state.status.error;
export const selectRedirectUrl = (state: RootState) => state.status.redirectUrl;

export const {
  startLoading,
  stopLoading,
  setMessageTitle,
  clearMessageTitle,
  setError,
  clearError,
  setRedirectUrl,
  clearRedirecttUrl
} = statusSlice.actions;

export default statusSlice.reducer;
