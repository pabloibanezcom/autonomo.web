import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import English from '../../lang/en.json';
import Spanish from '../../lang/es.json';
import { RootState } from '../store';

const STORAGE_KEY = 'locale';

const getMessagesFromLocale = (locale: string): { [name: string]: string } => {
  if (locale === 'es') {
    return Spanish;
  }
  return English;
};

interface i18nInitialState {
  locale: string;
  messages: { [name: string]: string };
}

const initialState: i18nInitialState = {
  locale: 'en',
  messages: null
};

export const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    getLanguageFromStorage(state) {
      state.locale = localStorage.get(STORAGE_KEY);
      state.messages = getMessagesFromLocale(localStorage.get(STORAGE_KEY));
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.locale = action.payload;
      state.messages = getMessagesFromLocale(action.payload);
      localStorage.setItem(STORAGE_KEY, action.payload);
    }
  }
});

export const selectLanguage = (state: RootState) => state.i18n.locale;
export const selectMessages = (state: RootState) => state.i18n.messages;

export default i18nSlice.reducer;
