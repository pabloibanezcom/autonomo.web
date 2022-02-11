/* eslint-disable no-param-reassign */
import { Theme } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const getCustomisedTheme = (): Theme => {
  return createTheme({
    typography: {
      fontFamily: 'inter',
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: '1.25',
        letterSpacing: 'normal'
      },
      h6: {
        fontSize: '1rem',
        lineHeight: '1.25',
        letterSpacing: 'normal'
      },
      body1: {
        fontSize: '13px',
        letterSpacing: 'normal'
      }
    }
  });
};
