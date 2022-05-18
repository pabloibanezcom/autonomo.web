import amber from '@mui/material/colors/amber';
import teal from '@mui/material/colors/teal';
import { Theme } from 'material/interfaces';
import { createTheme } from 'material/styles';

export const getCustomisedTheme = (): Theme => {
  return createTheme({
    palette: {
      primary: teal,
      warning: amber
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
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 700
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
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6
          },
          sizeMedium: {
            height: 24
          },
          sizeSmall: {
            height: 20,
            fontSize: 12
          },
          labelMedium: {
            paddingLeft: 8,
            paddingRight: 8
          },
          labelSmall: {
            paddingLeft: 6,
            paddingRight: 6
          }
        }
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            fontSize: '1.25rem',
            fontWeight: 700
          }
        }
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: '20px 24px',
            gap: 8
          }
        }
      }
    }
  });
};
