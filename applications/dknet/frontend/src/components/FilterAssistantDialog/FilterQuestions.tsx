import React, { useEffect } from "react"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import ProgressBar from "../widgets/ProgressBar";
import QuestionBox from "./QuestionBox";
import CheckBoxWidget from "../widgets/CheckBox";
import { styled } from "@mui/material/styles";
import Tooltip from '@mui/material/Tooltip';
import { Button, List, ListItem, ListItemButton, ListItemText, Grid, Stack } from "@mui/material";
import FilterDialogRadio from "./FilterDialogRadio";
import DialogStepFooter from "./DialogStepFooter";
import { vars } from '../../theme/variables'
import { useFilterContext } from "../../context/Context";
import { useResponsive } from '../../hooks/useResponsive';

const {
  grey200,
  primary25,
  primary600,
  grey500,
  cardChipBgColor,
  grey700,
  grey800,
  success700,
  white,
  success50,
  primary200,
  checkboxBorderColor,
  cardBgColor,
  grey600
} = vars;

export const Item = styled(Box)(({ theme }) => ({
  display: 'flex',
  border: `0.0625rem solid ${grey200}`,
  borderRadius: '0.75rem',
  width: '100%',
  '& .MuiFormControlLabel-root': {
    margin: 0,
    padding: theme.spacing(2),
  },
  '& .MuiCheckbox-root': {
    padding: 0
  },
  '& .MuiTypography-body1': {
    color: theme.palette.grey[700],
    marginLeft: '0.75rem',
    display: 'inline-block',
    maxWidth: '7rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis',
    fontWeight: 500,
    fontSize: '0.875rem',
  },
  '& .MuiTypography-body2': {
    color: theme.palette.grey[700],
    fontWeight: 500,
    fontSize: '0.875rem',
    marginTop: '0.5rem'
  },
  '&:hover': {
    border: `0.0625rem solid ${theme.palette.primary['main']}}`,
  },
  '&.checked-state': {
    background: primary25,
    boxShadow: `0 0 0 0.0625rem ${primary600}`,
    border: `0.0625rem solid ${theme.palette.primary['main']}}`,
  },
}));

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function FilterQuestions({ questionsTabs, onClickNext, onClickPrev, progress, handleChange, value, closeDialog, showPreview }) {
  const { screenSize } = useResponsive();

  // Responsive configurations
  const getResponsiveConfig = () => {
    switch (screenSize) {
      case 'tablet':
        return {
          sidebarWidth: '19rem',
          showPreviewByDefault: true,
          previewWidth: '24rem',
          questionMaxWidth: '38rem',
          gridCols: { 2: 'repeat(2, 1fr)', 3: 'repeat(2, 1fr)', 4: 'repeat(2, 1fr)' }
        };
      case 'laptop':
        return {
          sidebarWidth: '20rem',
          showPreviewByDefault: true,
          previewWidth: '25rem',
          questionMaxWidth: '40rem',
          gridCols: { 2: 'repeat(2, 1fr)', 3: 'repeat(3, 1fr)', 4: 'repeat(2, 1fr)' }
        };
      case 'smallDesktop':
        return {
          sidebarWidth: '21rem',
          showPreviewByDefault: true,
          previewWidth: '26rem',
          questionMaxWidth: '42rem',
          gridCols: { 2: 'repeat(2, 1fr)', 3: 'repeat(3, 1fr)', 4: 'repeat(4, 1fr)' }
        };
      case 'desktop':
        return {
          sidebarWidth: '22rem',
          showPreviewByDefault: true,
          previewWidth: '28rem',
          questionMaxWidth: '45rem',
          gridCols: { 2: 'repeat(2, 1fr)', 3: 'repeat(3, 1fr)', 4: 'repeat(4, 1fr)' }
        };
      case 'tooSmall':
        return {
          sidebarWidth: '18rem',
          showPreviewByDefault: false,
          previewWidth: '20rem',
          questionMaxWidth: '30rem',
          gridCols: { 2: 'repeat(1, 1fr)', 3: 'repeat(1, 1fr)', 4: 'repeat(1, 1fr)' }
        };
      default:
        return {
          sidebarWidth: '20rem',
          showPreviewByDefault: true,
          previewWidth: '25rem',
          questionMaxWidth: '40rem',
          gridCols: { 2: 'repeat(2, 1fr)', 3: 'repeat(3, 1fr)', 4: 'repeat(4, 1fr)' }
        };
    }
  };

  const config = getResponsiveConfig();

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (questionsTabs.length - 1 !== value) {
          handleNext();
        }
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  });


  const handleNext = () => {
    onClickNext()
  }


  const handlePrev = () => {
    onClickPrev()
  }

  const { context, setContext } = useFilterContext()
  const isFiltersEmpty = Object.values(context.filterValues).every(value => value === undefined);

  const setCheckedStateMultipleOptions = (question, data) => context?.filterValues[question.code]?.filter((selectedValue) => selectedValue?.code === data?.code).length > 0 ? 'checked-state' : '';

  const setCheckedStateSingleOption = (e, question, data) => {
    if (context?.filterValues[question.code]?.code === undefined || context?.filterValues[question.code]?.code !== data?.code) {
      setContext({
        ...context,
        showAll: false,
        filterValues: {
          ...context.filterValues,
          [question.code]: data
        }
      });
    } else if (context?.filterValues[question.code]?.code === data?.code) {
      const newData = context.filterValues;
      delete newData[question.code];
      setContext({
        ...context,
        showAll: false,
        filterValues: {
          ...newData
        }
      });
    }
  }

  const classes = {
    leftBlock: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      p: '0 0.75rem 1.5rem 0.75rem'
    },

    tabs: {
      pl: 1,
      flexGrow: 1,
      display: 'flex',
      maxHeight: 'calc(100% - 5rem)',
      overflow: 'auto',
      "& .MuiTabs-root": {
        borderRight: 0,
      },
      "& .MuiTab-root": {
        borderRight: 0,
        position: 'relative',

        '& em': {
          fontStyle: 'normal',
          fontSize: '0.875rem',
          color: grey500,
          position: 'relative',
          lineHeight: '143%',
        },
        '&:before': {
          content: '""',
          width: '0',
          height: '100%',
          left: '-0.5rem',
          top: 0,
          position: 'absolute',
          background: '#fff',
          borderRadius: '0.375rem',
          transition: 'all ease-in-out 1s'
        },
        "&.Mui-selected": {
          background: 'transparent',
          borderRadius: '0.375rem',
          color: grey700,
          '& em': {
            color: grey700,
          },
          '&:before': {
            width: 'calc(100% + 0.5rem)',
          }
        },
      },
      "& .MuiTabs-indicator": {
        left: 0,
        width: '0.125rem',
      },

    }
  };

  return (
    <Box sx={{ height: '100%' }} display='flex'>
      <Box sx={{ height: '100%', width: config.sidebarWidth }} display='flex' flexDirection='column' justifyContent='space-between'>
        <Box sx={classes.leftBlock}>
          <Box sx={{
            p: '1.25rem 0 0.75rem 0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <Typography variant='h4'>Questions</Typography>
            <Button variant="outlined">Reset</Button>
          </Box>
          <Box
            sx={classes.tabs}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              onChange={handleChange}
              value={value}
              sx={{
                borderRight: 1,
                borderColor: 'divider',
                overflow: 'initial',

                "& .MuiButtonBase-root": {
                  alignItems: 'baseline !important',
                  textAlign: 'left',
                  lineHeight: '143%',
                  textTransform: 'inherit',
                  color: grey500,
                  fontSize: '0.875rem',
                  fontWeight: 400,
                }
              }}
            >
              {
                questionsTabs?.map((question, index) =>
                  <Tab key={index} label={<Typography component='em'>{question?.question}</Typography>} {...a11yProps(index)} />
                )
              }
            </Tabs>
          </Box>
          <ProgressBar progress={progress} />
        </Box>
      </Box>
      <Box sx={{
        width: `calc(100% - ${config.sidebarWidth})`,
        borderLeft: `0.0625rem solid ${grey200}`,
        height: '100%',
        display: 'flex',
        overflow: 'hidden'
      }}>
        <Box sx={{
          width: showPreview ? `calc(100% - ${config.previewWidth})` : '100%',
          transition: 'width ease-in-out .3s',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {questionsTabs[value] && (
            <>
              {/* Fixed Header with Title and Subtitle */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '1.5rem 1.5rem 0 1.5rem',
                  flexShrink: 0,
                }}
              >
                <Stack maxWidth={config.questionMaxWidth} sx={{ width: '100%', textAlign: 'center' }} spacing={1}>
                  <Typography textAlign="left" variant="h3">{questionsTabs[value]?.questionTitle}</Typography>
                  <Typography textAlign="left" variant="h5" color={grey600}>{questionsTabs[value]?.questionSubtitle}</Typography>
                </Stack>
              </Box>

              {/* Scrollable QuestionBox Content */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '1.5rem',
                  flexGrow: 1,
                  overflow: 'hidden',
                }}
              >
                <Box
                  maxWidth={config.questionMaxWidth}
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <QuestionBox inputType={questionsTabs[value]?.inputType}>
                    {
                      // Add className='checked-state' in <Item is checkbox is selected
                      questionsTabs[value]?.inputType === 'MULTI' ? questionsTabs[value]?.options.map((data) => {
                        return (
                          <Tooltip title={data.label} key={data?.label}>
                            <Item className={setCheckedStateMultipleOptions(questionsTabs[value], data)}>
                              <CheckBoxWidget
                                data={data}
                                filter={questionsTabs[value]}
                              />
                            </Item>
                          </Tooltip>
                        )
                      }) :
                        <RadioGroup
                          sx={{
                            width: '100%',
                            display: 'grid !important',
                            gap: 1.5,
                            gridTemplateColumns: questionsTabs[value]?.options.length == 2 ? config.gridCols[2] : questionsTabs[value]?.options.length == 4 ? config.gridCols[4] : config.gridCols[3]
                          }}
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue=""
                          name="radio-buttons-group"
                          value={context?.filterValues[questionsTabs[value]?.code]?.code}
                        >
                          {questionsTabs[value]?.options.map((data, index) =>
                            // Add className='checked-state' in <Item is checkbox is selected
                            <Item key={"itemKey_" + index} className={context?.filterValues[questionsTabs[value].code]?.code === data?.code ? `checked-state` : ''} onClick={(e) => {
                              e.preventDefault();
                              setCheckedStateSingleOption(e, questionsTabs[value], data)
                            }} >
                              <FilterDialogRadio data={data} filter={data} question={questionsTabs[value]} />
                            </Item>
                          )}
                        </RadioGroup>
                    }
                  </QuestionBox>
                </Box>
              </Box>

              {/* Fixed Footer */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '0 1.5rem 1.5rem 1.5rem',
                  flexShrink: 0,
                }}
              >
                <Box maxWidth={config.questionMaxWidth} sx={{ width: '100%' }}>
                  <DialogStepFooter handlePrev={handlePrev} value={value} closeDialog={closeDialog} questionsTabs={questionsTabs} handleNext={handleNext} />
                </Box>
              </Box>
            </>
          )}
        </Box>
        <Box
          sx={{
            transition: 'all ease-in-out .3s',
            width: showPreview ? config.previewWidth : '0',
            minWidth: showPreview ? config.previewWidth : '0',
            maxWidth: showPreview ? config.previewWidth : '0',
            opacity: showPreview ? 1 : 0,
            background: white,
            borderLeft: showPreview ? `0.0625rem solid ${grey200}` : 'none',
            position: 'relative',
            overflow: showPreview ? 'auto' : 'hidden',
            height: '100%',
            '&:after': {
              content: "''",
              background: 'linear-gradient(180deg, rgba(249, 250, 251, 0.00) 0%, #F9FAFB 100%)',
              height: '7.75rem',
              zIndex: 1,
              width: '100%',
              display: showPreview ? 'block' : 'none',
              position: 'sticky',
              bottom: 0,
              left: 0,
              pointerEvents: 'none',
            }
          }}
        >
          <Box pt={4} px={3} pb={2}>
            <Typography variant="h4">Preview of results</Typography>
            {(isFiltersEmpty)
              ? <Typography sx={{ mt: 2 }} variant="subtitle2">Please select at least one filter to see the results</Typography>
              : <Typography sx={{ mt: 2 }} variant="subtitle2">{context.results.length} repositories matching your criteria so far</Typography>
            }
          </Box>
          <List disablePadding sx={{
            gap: 1,
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            '& .MuiListItemButton-root': {
              borderRadius: '0.375rem',
              alignItems: 'flex-start',
              minHeight: '3.625rem',
              p: 1,

              '&:hover': {
                boxShadow: '0rem 1.25rem 1.5rem -0.25rem rgba(16, 24, 40, 0.08), 0rem 0.5rem 0.5rem -0.25rem rgba(16, 24, 40, 0.03)'
              },

              '& .MuiListItemText-root': {
                margin: 0,
                display: 'flex',
                gap: '0.25rem',
                alignItems: 'flex-start'
              },

              '& .MuiListItemText-primary': {
                fontSize: '0.875rem',
                lineHeight: '142.857%',
                color: grey700,
              },

              '& .MuiListItemText-secondary': {
                fontSize: '0.75rem',
                lineHeight: '150%',
                padding: '0.125rem 0.5rem',
                whiteSpace: 'nowrap',
                color: success700,
                marginTop: '-0.5rem',
                marginRight: '-0.5rem',
                fontWeight: 500,
                borderRadius: '0rem 0rem 0.25rem 0.25rem',
                background: success50,
                mixBlendMode: 'multiply',
              }
            }
          }}>
            {!isFiltersEmpty ? context.results.map((el, index) => (
              <ListItem disablePadding key={el}>
                <ListItemButton sx={(index === 0 || el.pctMatch === context.results[0].pctMatch) && !isNaN(el.pctMatch) ?
                  {
                    border: `0.0625rem solid ${primary200}`,
                    background: cardBgColor,
                    '&:hover': {
                      background: cardBgColor,
                    },
                  }
                  : {
                    border: `0.0625rem solid ${checkboxBorderColor}`,
                    background: white,
                    '&:hover': {
                      background: white,
                    },
                  }}
                  onClick={() => {
                    closeDialog();
                    document.getElementById('result_' + index).scrollIntoView({ behavior: 'smooth' });
                  }}>
                  <ListItemText primary={!isNaN(el.pctMatch) ? `${el.label} ${el.pctMatch}%` : `${el.label}`} secondary={(index === 0 || el.pctMatch === context.results[0].pctMatch) && !isNaN(el.pctMatch) ? "Best Match" : null} />
                </ListItemButton>
              </ListItem>
            )) : <></>}
          </List>
        </Box>
      </Box>
    </Box>
  );
}
