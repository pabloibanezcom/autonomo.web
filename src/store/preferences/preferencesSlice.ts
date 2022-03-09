import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Preferences from 'interfaces/Preferences';
import { RootState } from 'store';
import {
  getPreferencesFromStorage,
  setPreferencesInStorage
} from 'util/preferences';

const initialState: Preferences = getPreferencesFromStorage();

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
      setPreferencesInStorage({
        ...state,
        language: action.payload
      });
    },
    setNavbarCollapsed(state, action: PayloadAction<boolean>) {
      state.navbarCollapsed = action.payload;
      setPreferencesInStorage({
        ...state,
        navbarCollapsed: action.payload
      });
    }
  }
});

export const selectPreferences = (state: RootState) => state.preferences;
export const { setLanguage, setNavbarCollapsed } = preferencesSlice.actions;

export default preferencesSlice.reducer;
