import teal from '@mui/material/colors/teal';
import { Theme } from 'material/interfaces';
import { createTheme } from 'material/styles';

export const getCustomisedTheme = (): Theme => {
  return createTheme({
    palette: {
      primary: teal
    },
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
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: 'none'
          }
        }
      },
      MuiButton: {
        defaultProps: {
          variant: 'contained'
        },
        styleOverrides: {
          root: {
            textTransform: 'none'
          }
        }
      }
    }
  });
};
