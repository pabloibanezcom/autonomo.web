/* eslint-disable no-param-reassign */
import { Theme } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import SegoeUIWoff2 from '../assets/fonts/segoe-ui.woff2';

const segoeUi = {
  fontFamily: 'Segoe UI',
  fontStyle: 'normal',
  fontWeight: 400,
  src: `
    local('Segoe UI'),
    local('Segoe UI-Regular'),
    url(${SegoeUIWoff2}) format('woff2')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
};

export const getCustomisedTheme = (): Theme => {
  return createTheme({
    typography: {
      fontFamily: 'Segoe UI, Roboto',
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
    // overrides: {
    //   MuiCssBaseline: {
    //     '@global': {
    //       '@font-face': [segoeUi]
    //     }
    //   }
    // }
  });
};
