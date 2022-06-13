import amber from '@mui/material/colors/amber';
import teal from '@mui/material/colors/teal';
import { Theme } from 'material/interfaces';
import { createTheme } from 'material/styles';

const FONT_FAMILY = 'inter';

export const getCustomisedTheme = (): Theme => {
  return createTheme({
    palette: {
      primary: teal,
      warning: amber
    },
    typography: {
      fontFamily: FONT_FAMILY,
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
      MuiCardActions: {
        styleOverrides: {
          root: {
            padding: 16
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
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
            fontSize: 13,
            letterSpacing: 'normal',
            fontFamily: FONT_FAMILY,
            lineHeight: 1.5,
            ':hover': {
              textDecoration: 'underline'
            }
          }
        }
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            paddingLeft: '0 !important',
            paddingRight: '0 !important'
          }
        }
      }
    }
  });
};
