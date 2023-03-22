import { createTheme } from "@mui/material/styles";
import { vars } from "./variables";

const { 
  primaryFont, white, 
  grey200, 
  grey400, grey500, 
  grey600, grey700, grey800, grey900, 
  //gray50,
  primary600, primary700, 
  //primary50, 
  //error700, error500, 
  //warning700, warning500, 
  //success700, success500, 
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
      position: 'absolute',
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
    },
    body1:{
    
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      .herobanner {
        background-image: url(../assets/heroBgIm.png) ;
        height: 50%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
      }
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
        root: {
          textTransform: 'none'
        },
        text: {
          color: grey600,
          fontWeight: 600
        },
        contained: {
          background: white,
          color: grey700,
          fontWeight: 600,
          border: `1px solid ${grey200}`,
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
          borderRadius: '8px'
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

      }
    },
    
  }
});

export default theme;
