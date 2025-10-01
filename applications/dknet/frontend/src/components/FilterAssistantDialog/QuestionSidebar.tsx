import React from 'react';
import { Box, Typography, Button, Tabs, Tab } from '@mui/material';
import ProgressBar from '../widgets/ProgressBar';
import { vars } from '../../theme/variables';
import { QuestionTab, ResponsiveConfig } from './types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const { grey500, grey700 } = vars;

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

interface QuestionSidebarProps {
  questionsTabs: QuestionTab[];
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  progress: number;
  config: ResponsiveConfig;
  filterValues: { [key: string]: any };
}

const a11yProps = (index: number) => ({
  id: `vertical-tab-${index}`,
  'aria-controls': `vertical-tabpanel-${index}`,
});

const QuestionSidebar: React.FC<QuestionSidebarProps> = ({
  questionsTabs,
  value,
  handleChange,
  progress,
  config,
  filterValues
}) => {

  // Helper function to check if a question has any selected filters
  const hasSelectedFilters = (question: QuestionTab): boolean => {
    const selectedValue = filterValues[question.code];

    // For single select questions HIERARCHY, check if there's a selected value with a code
    if (question.inputType === 'HIERARCHY') {
      return selectedValue && selectedValue.code;
    }

    // For multi select questions, check if array has any items
    if (question.inputType === 'MULTI') {
      return Array.isArray(selectedValue) && selectedValue.length > 0;
    }

    return false;
  };


  return (
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
        <Box sx={classes.tabs}>
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
            {questionsTabs?.map((question, index) => (
              <Tab
                key={index}
                label={<Box position="relative" display={'flex'} alignItems='center' justifyContent={'space-between'} gap={2}>
                  <Typography component='em'>{question?.question}</Typography>
                  <Box
                    sx={{
                      opacity: hasSelectedFilters(question) ? 1 : 0,
                      transform: hasSelectedFilters(question) ? 'scale(1)' : 'scale(0.8)',
                      transition: 'all 0.3s ease-in-out',
                      display: 'flex',
                      alignItems: 'center',
                      visibility: hasSelectedFilters(question) ? 'visible' : 'hidden'
                    }}
                  >
                    <CheckCircleOutlineIcon color="success" />
                  </Box>
                </Box>}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Box>
        <ProgressBar progress={progress} />
      </Box>
    </Box>
  );
};

export default QuestionSidebar;