import React, { useEffect, useLayoutEffect, useRef } from "react"
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
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import FilterDialogRadio from "./FilterDialogRadio";
import DialogStepFooter from "./DialogStepFooter";
import { vars } from '../../theme/variables'
import { useFilterContext } from "../../context/Context";

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
  cardBgColor
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

export default function FilterQuestions({ questionsTabs, onClickNext, onClickPrev, progress, handleChange, value, open, setHeight, setTranslateValue, height, translateValue, closeDialog, showPreview }) {

  const ref = useRef(null);

  useLayoutEffect(() => {
    const questionDOMHeightArr = Array.from(ref?.current?.childNodes).map((el: any) => el.clientHeight);
    setHeight(questionDOMHeightArr)
  }, [open, setHeight]);

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (questionsTabs.length - 1 !== value) {
          handleNext(value);
        }
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  });


  const handleNext = (index: number) => {

    setTranslateValue((prev: number) => {
      return prev + height[index]
    })

    onClickNext()
  }


  const handlePrev = (index: number) => {

    setTranslateValue((prev: number) => {
      return prev - height[index - 1]
    })

    onClickPrev()
  }

  const { context, setContext } = useFilterContext()

  const setCheckedStateMultipleOptions = (question, data) => context?.filterValues[question.code]?.filter((selectedValue) => selectedValue?.code === data?.code).length > 0 ? 'checked-state' : '';

  const setCheckedStateSingleOption = (e, question, data) => {
    if (context?.filterValues[question.code]?.code === undefined || context?.filterValues[question.code]?.code !== data?.code) {
      setContext({
        ...context,
        filterValues: {
          ...context.filterValues,
          [question.code]: data
        }
      });
    } else if(context?.filterValues[question.code]?.code === data?.code) {
      const newData = context.filterValues;
      delete newData[question.code];
      setContext({
        ...context,
        filterValues: {
          ...newData
        }
      });
    }
  }

  const classes = {
    active: {
      opacity: 1
    },

    next: {
      opacity: 0.4,
      pointerEvents: 'none'
    },

    hide: {},

    leftBlock: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
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
          background: cardChipBgColor,
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
        width: '0.0625rem',
      },

    }
  };

  return (
    <Box sx={{ height: '100%' }} display='flex'>
      <Box sx={{ height: '100%', width: '20rem' }} display='flex' flexDirection='column' justifyContent='space-between'>
        <Box sx={classes.leftBlock} px={2} py={3}>
          <Typography sx={{
            pl: 1,
            pt: 1,
            pb: 2
          }} variant='h4'>Questions</Typography>
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
      <Box sx={{ width: 'calc(100% - 20rem)', borderLeft: `0.0625rem solid ${grey200}`, height: '100%', display: 'flex' }}>
        <Box ref={ref} sx={{ height: '100%', width: 1, transition: 'transform ease-in-out .4s', transform: `translateY(-${translateValue}px)` }}>
          {questionsTabs.map((question, index) => {
            const isActive = value === index;
            const nextStep = value + 1 === index;
            const stepClass = isActive ? classes.active : classes.next;
            return (
              <>
                <Box sx={stepClass}
                  m='auto'
                  key={index} py={5} px={3} maxWidth='40rem'
                >
                  <Typography sx={{
                    fontWeight: 400,
                    fontSize: '1.25rem',
                    lineHeight: '150%',
                    color: grey800
                  }}>{question?.questionTitle}</Typography>
                  <Typography sx={{
                    paddingTop: '0.5rem',
                    fontWeight: 200,
                    fontSize: '1rem',
                    lineHeight: '120%',
                    color: grey800
                  }}>{question?.questionSubtitle}</Typography>
                  <QuestionBox inputType={question?.inputType}>
                    {
                      // Add className='checked-state' in <Item is checkbox is selected
                      question?.inputType === 'MULTI' ? question?.options.map((data) => {
                        return (
                          <Tooltip title={data.label} key={data?.label}>
                            <Item className={setCheckedStateMultipleOptions(question, data)}>
                              <CheckBoxWidget
                                data={data}
                                filter={question}
                              />
                            </Item>
                          </Tooltip>
                        )
                      }) :
                        <RadioGroup
                          sx={{
                            width: '100%',
                            display: 'grid',
                            gap: 1.5,
                            gridTemplateColumns: question?.options.length == 2 ? 'repeat(2, auto)' : question?.options.length == 4 ? 'repeat(4,  auto)' : 'repeat(3, auto)'
                          }}
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue=""
                          name="radio-buttons-group"
                          value={context?.filterValues[question?.code]?.code}
                        >
                          {question?.options.map((data) =>
                            // Add className='checked-state' in <Item is checkbox is selected
                            <Item key={data?.code} className={context?.filterValues[question.code]?.code === data?.code ? `checked-state` : ''} onClick={(e) => {
                              e.preventDefault();
                              setCheckedStateSingleOption(e, question, data)
                            }} >
                              <FilterDialogRadio data={data} filter={data} question={question} />
                            </Item>
                          )}
                        </RadioGroup>
                    }
                  </QuestionBox>
                  {!nextStep && <DialogStepFooter handlePrev={handlePrev} index={index} value={value} closeDialog={closeDialog} questionsTabs={questionsTabs} handleNext={handleNext} />}
                </Box>
              </>
            )
          })}
        </Box>
        <Box 
          flexShrink={0}
          marginRight={!showPreview ? '-25rem' : 0}
          sx={{
            transition: 'all ease-in-out .3s',
            background: white, width: '25rem', borderLeft: `0.0625rem solid ${grey200}`, position: 'relative', overflow: 'auto',
            '&:after': {
              content: "''",
              background: 'linear-gradient(180deg, rgba(249, 250, 251, 0.00) 0%, #F9FAFB 100%)',
              height: '7.75rem',
              zIndex: 1,
              width: '100%',
              display: 'block',
              position: 'sticky',
              bottom: 0,
              left: 0,
              pointerEvents: 'none',
            }
          }}
        >
          <Box pt={4} px={3} pb={2}>
            <Typography variant="h4">Preview of results</Typography>
            <Typography sx={{ mt: 2 }} variant="subtitle2">{context.results.length} repositories matching your criteria so far</Typography>
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
            {context.results.map((el, index) => (
              <ListItem disablePadding key={el}>
                <ListItemButton sx={ (index === 0 || el.pctMatch === context.results[0].pctMatch) && !isNaN(el.pctMatch) ?
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
                  }}>
                  <ListItemText primary={!isNaN(el.pctMatch) ? `${el.label} ${el.pctMatch}%` : `${el.label}`} secondary={(index === 0 || el.pctMatch === context.results[0].pctMatch) && !isNaN(el.pctMatch) ? "Best Match" : null} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}
