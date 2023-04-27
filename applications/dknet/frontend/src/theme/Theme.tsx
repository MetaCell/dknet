import { createTheme } from "@mui/material/styles";
import { vars } from "./variables";

const {
  primaryFont, white,
  grey200,
  grey400, grey500,
  grey600, grey700, grey800, grey900,
  grey50,
  primary600, primary700, primary25, primary200,
  primary50,
  error700, error500, error600, error25,
  warning25, warning700, warning500,
  success50, success700, success500,
  checkboxBorderColor,
  checkboxBgChecked,
  cardBorderColor,
  cardBgColor,
  cardChipBgColor,
  warning50,
  warning300,
  dialogBoxShadow,
  primary500
} = vars;

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fff'
    },
    text: {
    },
    grey: {
      600: grey600,
      700: grey700,
      800: grey800,
      900: grey900
    },
    warning: {
      500: warning500,
      700: warning700
    },
    action: {
      active: primary600
    },
    primary: {
      main: primary600,
      700: primary700
    },
    secondary: {
      main: primary700
    }
  },
  shape: {

  },
  mixins: {
    toolbar: {
      minHeight: "5.75rem",
      width: '100%'
    },
  },
  typography: {
    fontFamily: primaryFont,
    subtitle1: {
      fontSize: '1.25rem',
      color: grey500,
      fontWeight: 600
    },
    h1:{
      fontWeight: 600,
      fontSize: "2.25rem",
      color: grey800
    },
    h2:{
      fontWeight: 600,
      fontSize: "1.286rem",
      color: grey800
    },
    h4: {
      fontWeight: 500,
      lineHeight: '143%',
      color: grey700,
      fontSize: '0.875rem'
    },
    h5: {
      fontWeight: 600,
      color: grey700,
      fontSize: '1rem'
    },
    h6: {
      fontWeight: 700,
      color: grey900
    },
    subtitle2: {
      fontSize: '0.875rem',
      color: grey500
    },
    caption: {
      fontWeight: 700,
      fontSize: '0.875rem'
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 500
    },
    body1:{

    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: ${grey200};
        border-radius: 8px;
      }
      .disclaimerBox {
        backgroundColor: ${warning25};
        border-radius: 12px;
        border: 1px solid ${warning300};
      }
      .goodProgress {
        color: ${primary600};
        background: ${primary25};
        .MuiCircularProgress-root {
          color: ${primary600};
        }
      }
      .averageProgress {
        color: ${warning500};
        background: ${warning25};
        .MuiCircularProgress-root {
          color: ${warning500};
        }
      }
      .poorProgress {
        color: ${error600};
        background: ${error25};
        .MuiCircularProgress-root {
          color: ${error600};
        }
      }
      `
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderLeft: `0.0625rem solid ${grey200}`,
          overflow: 'initial'
        },
      }
    },
    MuiTabs: {
      styleOverrides: {
        scroller: {
          overflow: 'initial'
        },
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '0.875rem',
          color: grey500
        },
        filled: {
        },
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: white,
          border: `1px solid ${checkboxBorderColor}`,
          borderRadius: '0.75rem',
          boxShadow: 'none',
          '&.successCard': {
            background: primary25,
            border:`1px solid ${primary200}`
          }
        }
      }
    },
    MuiCardActionArea:     {
      styleOverrides: {
        root: {
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.MuiFormControl-root': {
            '& .MuiInputLabel-root': {
              fontWeight: 500,
              fontSize: '0.875rem',
              color: grey500
            },
          },
          '& .MuiOutlinedInput-input': {
            padding: '8px 12px',
            fontWeight: 500,
            fontSize: '0.875rem',
            color: grey500
          },
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: 'transparent !important',
          },
          '& .MuiSvgIcon-root': {
            color: grey500
          },
          '&.Mui-focused': {
            background: grey50,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent'
            }
          },
          '& .MuiSelect-root .Mui-focused':{
            borderColor: 'transparent'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '0.5rem',
          minHeight: '2.25rem',
          lineHeight: 1,
          fontSize: '0.875rem'
        },
        text: {
          color: grey600,
          fontWeight: 600,
          '&:hover':{
            backgroundColor: 'transparent',
            color: grey600
          }
        },
        contained: {
          background: primary500,
          border: `1px solid ${primary600}`,
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
          color: white,
          '&:hover': {
            background: primary600,
            color: white,
            boxShadow: '0 1px 2px rgba(16, 24, 40, 0.05)',
          }
        },
        outlined: {
          background: white,
          color: grey700,
          fontWeight: 600,
          border: `1px solid ${grey200}`,
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
          '&:hover': {
            background: grey50,
            border: `1px solid ${checkboxBorderColor}`,
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          padding: '2px 8px',
          background: cardChipBgColor,
          borderRadius: '1rem',
          height: 'auto',
          '& .MuiChip-label':{
            padding: 0,
            fontSize: '0.75rem',
            color: grey700,
            fontWeight: 500
          },
          '& .MuiSvgIcon-root': {
            width: '0.75rem',
            height: '0.75rem',
            marginRight: '5px',
            marginLeft: 0
          },
          '&.MuiChip-colorWarning': {
            backgroundColor: warning50,
            '& .MuiChip-label':{
              color: warning700
            },
            '& .MuiSvgIcon-root':{
              color: warning500,
            }
          },
          '&.MuiChip-colorSuccess': {
            backgroundColor: success50,
            '& .MuiChip-label':{
              color: success700
            },
            '& .MuiSvgIcon-root':{
              color: success500,
            }
          },
          '&.cardBadge': {
            background: success50,
            borderRadius: '0px 0px 4px 4px',
            '& .MuiChip-label':{
              color: success700
            },
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        colorPrimary: {
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeSmall: {
          width: '1rem',
          height: '1rem'
        },
        fontSizeMedium:{
          width: '1.25rem',
          height: '1.25rem'
        },
        fontSizeLarge:{
          width: '2rem',
          height: '2rem'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        outlined: {
        }
      }
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiChip-root': {
            borderRadius: '6px',
            background: white,
            border: '1px solid #D0D5DD',
            padding: '2px 4px 2px 9px',
            '& .MuiChip-label': {
              color: grey700,
              fontSize: '0.857rem',
              fontWeight: 500,
              paddingLeft: 0,
            },
            '& .MuiSvgIcon-root': {
              color: grey400
            },
          },
        },
        listbox: {
          '& .MuiAutocomplete-option': {
            margin: '4px 6px',
            padding: 0,
            fontSize: '0.875rem',
            fontWeight: 500,
            color: grey900,
            '&.Mui-focused': {
              backgroundColor: grey50,
              borderRadius: '6px'
            },
            '& .MuiSvgIcon-root': {
              color: checkboxBorderColor,
              borderRadius: '4px'
            },

          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        root: {
        },
        paper: {
          height: 'calc(100vh - 4rem)',
          maxHeight: 'calc(100vh - 4rem)'
        },
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          overflow: 'hidden',
          padding: 0
        }
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: () => ({
        })
      }
    },
    MuiSwitch: {
      styleOverrides: {
        root: {

        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          justifyContent: "flex-end",
          alignItems: "flex-start",
          '& .MuiTypography-subtitle1': {
            fontWeight: 500
          },
          '& .MuiTypography-subtitle2': {
            fontWeight: 700
          },
          '& .MuiIconButton-root':{
            '&:hover':{
              backgroundColor: grey50,
              borderRadius: '4px'
            }
          },
          '& .MuiSvgIcon-root': {
            color: grey500
          },
          '& .MuiDivider-root': {
            marginTop: '1rem',
            marginBottom: '1rem',
            borderColor: grey200,
            borderWidth: '1px'
          }
        },
        paper: {
          border: `1px solid ${grey200}`,
          boxShadow: dialogBoxShadow,
          borderRadius: 'unset',
          padding: '22px',
          maxWidth: '400px',
          maxHeight: 'none',
          height: '100%'
        },
      }
    },
    MuiCircularProgress: {
      styleOverrides: {

      }
    },
    MuiDivider:{
      styleOverrides:{
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
      }
    },
    MuiInputBase:{
      styleOverrides:{
        root: {
        }
      }
    },
    MuiFormControlLabel:{
      styleOverrides:{
        root: {
          fontSize: '14px',
          fontWeight: '400',
          color: grey500,
        }
      }
    },

  }
});

export default theme;
