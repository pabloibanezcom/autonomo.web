import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Preferences from 'interfaces/Preferences';
import { RootState } from 'store';
import {
  getPreferencesFromStorage,
  setPreferencesInStorage
} from 'util/preferences';

interface PreferencesInitialState {
  preferences: Preferences;
}

const initialState: PreferencesInitialState = {
  preferences: getPreferencesFromStorage()
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setPreferences(state, action: PayloadAction<Preferences>) {
      state.preferences = action.payload;
      setPreferencesInStorage(action.payload);
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.preferences.language = action.payload;
      setPreferencesInStorage({
        ...state.preferences,
        language: action.payload
      });
    },
    setNavbarCollapsed(state, action: PayloadAction<boolean>) {
      state.preferences.navbarCollapsed = action.payload;
      setPreferencesInStorage({
        ...state.preferences,
        navbarCollapsed: action.payload
      });
    }
  }
});

export const selectPreferences = (state: RootState) =>
  state.preferences.preferences;
export const { setPreferences, setLanguage, setNavbarCollapsed } =
  preferencesSlice.actions;

export default preferencesSlice.reducer;
