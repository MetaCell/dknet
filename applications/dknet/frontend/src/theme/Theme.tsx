import { createTheme } from "@mui/material/styles";
import { vars } from "./variables";

const {
  primaryFont, white,
  grey200,
  grey400, grey500,
  grey600, grey700, grey800, grey900,
  grey50,
  primary600, primary700, primary25, primary200,
  error600, error25,
  warning25, warning700, warning500,
  success50, success700,
  checkboxBorderColor,
  cardChipBgColor,
  warning50,
  warning300,
  dialogBoxShadow,
  primary500,
  primary800,
  primary50,
  checkboxBgChecked,
  grey300
} = vars;

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,    // Mobile/tablet
      md: 1024,   // Tablet/small laptop
      lg: 1280,   // Laptop
      xl: 1920,   // Desktop
    },
  },
  palette: {
    mode: 'light',
    background: {
      default: white
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
      fontWeight: 600,
      '@media (max-width:768px)': {
        fontSize: '1rem',
      }
    },
    h1: {
      fontWeight: 600,
      fontSize: "2.25rem",
      color: grey800,
      '@media (max-width:1024px)': {
        fontSize: '2rem',
      },
      '@media (max-width:768px)': {
        fontSize: '1.75rem',
      }
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.125rem",
      color: grey800
    },
    h3: {
      fontSize: "1.25rem",
      color: grey800
    },
    h4: {
      fontWeight: 500,
      color: grey700,
      fontSize: '0.875rem'
    },
    h5: {
      color: grey700,
      fontSize: '1rem'
    },
    subtitle2: {
      fontSize: '0.875rem',
      color: grey500,
      fontWeight: 400
    },
    body2: {
      fontSize: '0.875rem',
      color: grey600,
    },
    body1: {

    }
  },
  components: {
    MuiTouchRipple: {
      styleOverrides: {
        root: {
          display: 'none'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: `
      body {padding: 0 !important; margin: 0;
      overflow-y: scroll !important;
      }
      ::-webkit-scrollbar {
        width: 0.5rem;
        height: 0.5rem;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: ${grey200};
        border-radius: 0.5rem;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${grey300};
      }
      ::-webkit-scrollbar-corner {
        background: transparent;
      }
      .disclaimerBox {
        backgroundColor: ${warning25};
        border-radius: 0.75rem;
        border: 0.0625rem solid ${warning300};
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

      .MuiSimpleTreeView-root .MuiTreeItem-content .MuiTreeItem-label {
        line-height: 1
      }

      .MuiSimpleTreeView-root .MuiTreeItem-root + .MuiTreeItem-root {
        margin-top: 0.5rem
      }

      .MuiSimpleTreeView-root .MuiTreeItem-content {
        border-radius: 0;
        padding: 0
      }

      .MuiSimpleTreeView-root .MuiTreeItem-content .MuiTreeItem-iconContainer {
        display: none
      }

      .MuiSimpleTreeView-root .MuiTreeItem-content.Mui-selected,
      .MuiSimpleTreeView-root .MuiTreeItem-content.Mui-selected.Mui-focused,
      .MuiSimpleTreeView-root .MuiTreeItem-content.Mui-selected:hover,
      .MuiSimpleTreeView-root .MuiTreeItem-content:hover {
        background: transparent
      }

      .MuiSimpleTreeView-root .MuiTreeItem-root .MuiTreeItem-groupTransition {
        border-left: 0.0625rem solid ${grey200};
        margin-left: 0.625rem;
        padding-left: 1.125rem;
        margin-top: 0.5rem;
      }
      `
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          '&.Mui-checked': {
            '& + p': {
              color: '#05796B'
            }
          }
        }
      },
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
          border: `0.0625rem solid ${checkboxBorderColor}`,
          borderRadius: '0.75rem',
          boxShadow: 'none',
          '&.successCard': {
            background: primary25,
            border: `0.0625rem solid ${primary200}`,
          },
          '&:hover': {
            boxShadow: dialogBoxShadow
          }
        }
      }
    },

    MuiRadio: {
      styleOverrides: {
        root: {
          padding: 0
        }
      }
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
        }
      }
    },
    MuiCardActionArea: {
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
            padding: '0.5rem 0.75rem',
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
          '& .MuiSelect-root .Mui-focused': {
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
          '&:hover': {
            backgroundColor: 'transparent',
            color: grey600
          }
        },
        contained: {
          background: primary500,
          border: `0.0625rem solid ${primary600}`,
          boxShadow: '0rem 0.0625rem 0.125rem rgba(16, 24, 40, 0.05)',
          color: white,
          '&:hover': {
            background: primary600,
            color: white,
            boxShadow: '0 0.0625rem 0.125rem rgba(16, 24, 40, 0.05)',
          }
        },
        containedSecondary: {
          background: primary50,
          border: `0.0625rem solid ${primary50}`,
          color: primary700,
          boxShadow: 'none',
          '&:hover': {
            background: checkboxBgChecked,
            boxShadow: 'none',
            color: primary800,
          },
          '&:focus': {
            background: primary50,
            color: primary700,
            boxShadow: '0rem 0rem 0rem 0.25rem #AAE7C7, 0rem 0.0625rem 0.125rem 0rem #1018280D',
          }
        },
        outlined: {
          background: white,
          color: grey700,
          fontWeight: 600,
          border: `0.0625rem solid ${grey200}`,
          boxShadow: '0rem 0.0625rem 0.125rem rgba(16, 24, 40, 0.05)',
          '&:hover': {
            background: grey50,
            border: `0.0625rem solid ${checkboxBorderColor}`,
            boxShadow: '0rem 0.0625rem 0.125rem rgba(16, 24, 40, 0.05)',
          },
          '&.Mui-disabled': {
            color: grey300,
            borderColor: grey200,
          }
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          padding: '0.125rem 0.5rem',
          background: cardChipBgColor,
          borderRadius: '1rem',
          height: 'auto',
          '& .MuiChip-label': {
            padding: 0,
            fontSize: '0.75rem',
            color: grey700,
            fontWeight: 500
          },
          '& .MuiSvgIcon-root': {
            width: '0.75rem',
            height: '0.75rem',
            marginRight: '0.3125rem',
            marginLeft: 0
          },
          '&.MuiChip-colorWarning': {
            backgroundColor: warning50,
            '& .MuiChip-label': {
              color: warning700
            },
            '& .MuiSvgIcon-root': {
              color: warning500,
            }
          },
          '&.MuiChip-colorSuccess': {
            backgroundColor: success50,
            '& .MuiChip-label': {
              color: success700
            },
            '& .MuiSvgIcon-root': {
              color: success50,
            }
          },
          '&.cardBadge': {
            background: success50,
            borderRadius: '0rem 0rem 0.25rem 0.25rem',
            '& .MuiChip-label': {
              color: success700
            },
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 2px 0 rgba(16, 24, 40, 0.05)',
          padding: '0.5rem',
          borderRadius: '0.5rem',

          '&.outlined': {
            border: `0.0625rem solid ${grey200}`,
            background: white,


            '&:hover': {
              boxShadow: '0 1px 2px 0 rgba(16, 24, 40, 0.05), 0 0 0 4px #F2F4F7',
              background: grey50,
            },

            '&.active': {
              borderColor: checkboxBorderColor,
              boxShadow: '0 1px 2px 0 rgba(16, 24, 40, 0.05), 0 0 0 4px #F2F4F7'
            },
          },

        },
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
        fontSizeMedium: {
          width: '1.25rem',
          height: '1.25rem'
        },
        fontSizeLarge: {
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
            borderRadius: '0.375rem',
            background: white,
            border: '0.0625rem solid #D0D5DD',
            padding: '0.125rem 0.25rem 0.125rem 0.5625rem',
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
            margin: '0.25rem 0.375rem',
            padding: 0,
            fontSize: '0.875rem',
            fontWeight: 500,
            color: grey900,
            '&.Mui-focused': {
              backgroundColor: grey50,
              borderRadius: '0.375rem'
            },
            '& .MuiSvgIcon-root': {
              color: checkboxBorderColor,
              borderRadius: '0.25rem'
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
          maxWidth: '90rem',
          maxHeight: 'calc(100vh - 4rem)'
        },
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${grey200}`,
          boxShadow: '0 1px 2px 0 rgba(16, 24, 40, 0.05)',
          padding: '0 0.625rem 0 1.5rem',
          height: '3.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '.5rem',
        }
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
          margin: 0
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
          '& .MuiIconButton-root': {
            '&:hover': {
              backgroundColor: grey50,
              borderRadius: '0.25rem'
            }
          },
          '& .MuiSvgIcon-root': {
            color: grey500
          },
          '& .MuiDivider-root': {
            marginTop: '1rem',
            marginBottom: '1rem',
            borderColor: grey200,
            borderWidth: '0.0625rem'
          }
        },
        paper: {
          border: `0.0625rem solid ${grey200}`,
          boxShadow: dialogBoxShadow,
          borderRadius: 'unset',
          padding: '1.375rem',
          maxWidth: '25rem',
          maxHeight: 'none',
          height: '100%'
        },
      }
    },
    MuiCircularProgress: {
      styleOverrides: {

      }
    },
    MuiDivider: {
      styleOverrides: {
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecorationColor: grey800,
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '& .MuiButtonBase-root': {
            '& .MuiSvgIcon-root': {
              marginRight: 0,
              marginLeft: '0.3125rem'
            }
          },
          '&.Mui-focused': {
            backgroundColor: 'transparent !important',
          }
        }
      }
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          gap: '0.5rem'
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          lineHeight: 1,
          flex: 1,
          fontSize: '0.875rem',
        },
        root: {
          flexGrow: 1,
          gap: '0.5rem',
          fontSize: '0.875rem',
          fontWeight: '400',
          color: grey500,
          lineHeight: 1,
          margin: 0,

          '& .MuiTypography-root': {
            lineHeight: 1,
          }
        }
      }
    },

  }
});

export default theme;
