import { createTheme } from "@mui/material/styles";
import { vars } from "./variables";

const { 
  primaryFont, 
  white, 
  grey200, grey400, grey500, grey600, grey700, grey800, grey900, gray50,
  primary600, primary700, primary50, 
  error700, error500, 
  warning700, warning500, 
  success700, success500, 
} = vars;

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000'
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
      minHeight: "3rem",
    },
  },
  typography: {
    fontFamily: primaryFont,
    subtitle1: {
      fontSize: '0.875rem'
    },
    h4:{
      fontWeight: 600,
      fontSize: "2.25rem",
      color: grey800
    },
    h6: {
      fontWeight: 400
    },
    subtitle2: {
      fontSize: '0.75rem'
    },
    caption: {
    
    },
    body2: {
    },
    body1:{
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      `
    },
    MuiInputLabel: {
      styleOverrides: {
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
        }
      }
    },
    MuiButton: {
      styleOverrides: {
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
        },
        fontSizeMedium:{
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
        root: ({ theme }) => ({
        }),
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }) => ({
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

      }
    },
    
  }
});

export default theme;
