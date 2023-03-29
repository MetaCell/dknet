import { createTheme } from "@mui/material/styles";
import { vars } from "./variables";

const { 
  primaryFont, white, 
  grey200, 
  grey400, grey500, 
  grey600, grey700, grey800, grey900, 
  grey50,
  primary600, primary700, 
  primary50, 
  error700, error500, 
  warning700, warning500, 
  success700, success500, 
  checkboxBorderColor,
  checkboxBgChecked

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
      700: grey700,
      800: grey800,
      900: grey900
    },
    action: {
      active: primary600
    },
    primary: {
      main: primary600
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
      fontSize: '1.25rem', //18px
      color: grey500
    },
    h4:{
      fontWeight: 600,
      fontSize: "2.25rem",
      color: grey800
    },
    h6: {
      fontWeight: 700,
      color: grey900
    },
    subtitle2: {
      fontSize: '0.857rem', //14px
      color: grey500
    },
    caption: {
    
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400
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
      `
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
          '&.search_btn':{
            background: primary600,
            border: `1px solid ${primary600}`,
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
            color: white,
            '&:hover': {
              background: primary700,
              color: white,
            }
          }
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
          background: white,
          color: grey700,
          fontWeight: 600,
          border: `1px solid ${grey200}`,
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
          borderRadius: '8px',
          '&:hover': {
            background: grey50,
            border: `1px solid ${checkboxBorderColor}`,
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
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
            }
          }
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
        },
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: () => ({
        }),
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
        }
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
    
  }
});

export default theme;
