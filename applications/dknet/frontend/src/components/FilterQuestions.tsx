import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import ProgressBar from "./widgets/ProgressBar";
import QuestionBox from "./QuestionBox";
import CheckBoxWidget from "./widgets/CheckBox";
import { styled } from "@mui/material/styles";
import Radio from '@mui/material/Radio';
import { FeaturedIcon, FeaturedIconChecked } from '../assets/icons';
import { FormControlLabel } from "@mui/material";

export const Item = styled(Box)(({ theme }) => ({
  display: 'flex',
  border: `0.0625rem solid ${theme.palette.grey[200]}`,
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
    width: '8.625rem',
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
    backgroundColor: '#F8FDFA',
    border: `0.0625rem solid ${theme.palette.primary['main']}}`,
  }
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

export default function FilterQuestions({ questionsTabs, onClickNext, onClickPrev, progress, handleChange, value, open, setHeight, setTranslateValue, height, translateValue }) {

  const ref = useRef(null);

  useLayoutEffect(() => {
    const temparr = Array.from(ref?.current?.childNodes).map((el: any) => el.clientHeight);
    setHeight(temparr)
  }, [open]);

  useEffect(() => {
    const keyDownHandler = (event: any) => {
      if (event.key === 'Enter') {
        if (questionsTabs.length - 1 !== value) {
          const currentIndex = 0;
          event.preventDefault();
          handleNext(currentIndex + 1);
        } else {
          alert('Steps Over')
        }

      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [value, translateValue]);


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
          color: '#667085',
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
          background: '#F2F4F7',
          borderRadius: '0.375rem',
          transition: 'all ease-in-out 1s'
        },
        "&.Mui-selected": {
          background: 'transparent',
          borderRadius: '0.375rem',
          color: '#344054',
          '& em': {
            color: '#344054',
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
    <Grid sx={{ height: '100%' }} container>
      <Grid item xs={0} md={3} sx={{ height: '100%' }} display='flex' flexDirection='column' justifyContent='space-between'>
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
                  color: '#667085',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                }
              }}
            >
              {
                questionsTabs?.map((question, index) =>
                  <Tab key={index} label={<Typography component='em'>{question?.question }</Typography>} {...a11yProps(index)} />
                )
              }
            </Tabs>
          </Box>
          <ProgressBar progress={progress} />
        </Box>
      </Grid>
      <Grid item xs={0} md={9} sx={{ borderLeft: '0.0625rem solid #EAECF0', height: '100%' }}>
        <Box ref={ref} sx={{ height: '100%', transition: 'transform ease-in-out .4s', transform: `translateY(-${translateValue}px)` }} px={5}>
          {questionsTabs.map((question, index) => {
            const isActive = value === index;
            const nextStep = value + 1 === index;
            const stepClass = isActive ? classes.active : classes.next;
            return (
              <>
                <Box sx={stepClass}
                  key={index} py={5} px={5}
                >
                  <Typography sx={{
                    fontWeight: 400,
                    fontSize: '1.25rem',
                    lineHeight: '150%',
                    color: '#1D2939'
                  }}>{question?.question}</Typography>
                  <QuestionBox>
                    {
                      question?.options.map((data) =>
                        question?.inputType === 'MULTI' ? <Item key={data?.label}>
                          <CheckBoxWidget
                            data={data}
                            filter={data}
                          />
                        </Item> :
                          <Item key={data?.label} justifyContent="center" alignItems="center" flexDirection="column">
                            {/* <Radio
                              value={data?.code}
                              name={question?.code}
                              sx={{ '& .MuiSvgIcon-root': { fill: 'none' } }}
                              icon={<FeaturedIcon />}
                              checkedIcon={<FeaturedIconChecked />}
                              inputProps={{ 'aria-label': data?.label }}
                            />
                            <Typography variant="body2">{data?.label}</Typography> */}

                            <FormControlLabel name={question?.code} value={data?.code} control={<Radio />} label={data?.code} />
                          </Item>
                      )
                    }
                  </QuestionBox>
                  {!nextStep && (
                    <Box display='flex' alignItems='center'>
                      {value !== 0 && <Button sx={{ mr: 1 }} variant='outlined' onClick={() => handlePrev(index)}>Prev</Button>}
                      {questionsTabs?.length === value + 1 ? (
                        <Button variant='contained' onClick={() => console.log('Go to results')}>Go to results</Button>
                      ) : (
                        <>
                          <Box display='flex' alignItems='center' flexGrow={1}>
                            <Button variant='contained' onClick={() => handleNext(index)}>
                              Next
                            </Button>

                            <Typography sx={{
                              ml: 1,
                              fontWeight: 400,
                              fontSize: '0.875rem',
                              lineHeight: '143%',
                              color: '#98A2B3',
                            }}>
                              or press Enter
                            </Typography>
                          </Box>
                          <Button onClick={() => handleNext(index)}>
                            Skip
                          </Button>
                        </>
                      )}
                    </Box>
                  )}

                </Box>
              </>
            )
          })}
        </Box>
      </Grid>
    </Grid>
  );
}
