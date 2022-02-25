import { RootState } from 'store';

export const selectLocale = (state: RootState) => state.intl.locale;
export const selectLocaleAndMessages = (state: RootState) => state.intl;
