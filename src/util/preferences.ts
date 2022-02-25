import Preferences from '../interfaces/Preferences';

const PREFERENCES_KEY = 'preferences';

const defaultPreferences: Preferences = {
  language: 'en',
  navbarCollapsed: false
};

export const getPreferencesFromStorage = (): Preferences => {
  const preferencesStr = localStorage.getItem(PREFERENCES_KEY);
  if (preferencesStr) {
    return JSON.parse(preferencesStr);
  }
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(defaultPreferences));
  return defaultPreferences;
};

export const setPreferencesInStorage = (preferences: Preferences): void => {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
};
