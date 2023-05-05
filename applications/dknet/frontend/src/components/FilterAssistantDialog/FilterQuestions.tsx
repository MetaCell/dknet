import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import Grid from "@mui/material/Grid";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import ProgressBar from "../widgets/ProgressBar";
import QuestionBox from "./QuestionBox";
import CheckBoxWidget from "../widgets/CheckBox";
import { styled } from "@mui/material/styles";
import Radio from '@mui/material/Radio';
import { FeaturedIcon, FeaturedIconChecked } from '../../assets/icons';
import { FormControlLabel } from "@mui/material";
import FilterDialogRadio from "./FilterDialogRadio";
import DialogStepFooter from "./DialogStepFooter";
import { vars } from '../../theme/variables.js'

const {
  grey200,
  primary25,
  primary600,
  grey500,
  cardChipBgColor,
  grey700,
  grey800
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

export default function FilterQuestions({ questionsTabs, onClickNext, onClickPrev, progress, handleChange, value, open, setHeight, setTranslateValue, height, translateValue, closeDialog }) {

  const ref = useRef(null);

  useLayoutEffect(() => {
    const questionDOMHeightArr = Array.from(ref?.current?.childNodes).map((el: any) => el.clientHeight);
    setHeight(questionDOMHeightArr)
  }, [open]);

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
                  color: grey500,
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
      <Grid item xs={0} md={9} sx={{ borderLeft: `0.0625rem solid ${grey200}`, height: '100%' }}>
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
                    color: grey800
                  }}>{question?.question}</Typography>
                  <QuestionBox inputType={question?.inputType}>
                    {
                      // Add className='checked-state' in <Item is checkbox is selected
                      question?.inputType === 'MULTI' ? question?.options.map((data) => <Item key={data?.label}>
                        <CheckBoxWidget
                          data={data}
                          filter={question}
                        />
                      </Item> ) :
                        <RadioGroup
                          sx={{
                            width: '100%',
                            display: 'grid',
                            gap: 1.5,
                            gridTemplateColumns: question?.options.length == 2 ? 'repeat(2, auto)' : question?.options.length == 4 ? 'repeat(4,  auto)' : 'repeat(3, auto)'
                          }}
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          { question?.options.map((data) =>
                            // Add className='checked-state' in <Item is checkbox is selected
                            <Item key={data?.code}>
                              <FilterDialogRadio data={data} filter={data} question={question} />
                            </Item>
                          ) }
                        </RadioGroup>
                    }
                  </QuestionBox>
                  {!nextStep && <DialogStepFooter  handlePrev={handlePrev} index={index} value={value} closeDialog={closeDialog} questionsTabs={questionsTabs} handleNext={handleNext} />}
                </Box>
              </>
            )
          })}
        </Box>
      </Grid>
    </Grid>
  );
}
