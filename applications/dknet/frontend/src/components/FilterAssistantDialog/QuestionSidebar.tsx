import React, { useCallback } from 'react';
import { Box, Typography, Button, Tabs, Tab } from '@mui/material';
import ProgressBar from '../widgets/ProgressBar';
import { vars } from '../../theme/variables';
import { QuestionTab, ResponsiveConfig } from '../../utils/types';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useFilterContext } from '../../context/Context';
import { resetFilters } from '../../utils/helpers';
const { grey500, primary700, primary600, white, grey300 } = vars;

const styles = {
  container: (sidebarWidth: string) => ({
    height: '100%',
    width: sidebarWidth,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }),
  leftBlock: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    p: '0 0.75rem 1.5rem 0.75rem'
  },
  header: {
    p: '1.25rem 0 0.75rem 0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabs: {
    pl: 1,
    flexGrow: 1,
    display: 'flex',
    maxHeight: 'calc(100% - 5rem)',
    overflow: 'auto',
    "& .MuiTab-root": {
      borderRight: 0,
      position: 'relative',
      textAlign: 'left',
      textTransform: 'inherit',
      color: grey500,
      borderLeft: `1px solid ${grey300}`,
      '&:before': {
        content: '""',
        width: '0',
        height: '100%',
        left: '-0.5rem',
        top: 0,
        position: 'absolute',
        background: white,
        borderRadius: '0.375rem',
        transition: 'all ease-in-out 1s'
      },
      "&.Mui-selected": {
        borderRadius: '0.375rem',
        "& .MuiTypography-root": {
          color: primary700,
          fontWeight: 600,
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
  },
  tabLabel: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 2
  },
  checkIcon: (hasSelected: boolean) => ({
    opacity: hasSelected ? 1 : 0,
    transform: hasSelected ? 'scale(1)' : 'scale(0.8)',
    transition: 'all 0.3s ease-in-out',
    visibility: hasSelected ? 'visible' : 'hidden',
    color: primary600
  })
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
  const { context, setContext } = useFilterContext();

  // Handler for resetting all filters
  const handleResetFilters = useCallback(() => {
    setContext({
      ...context,
      showAll: false,
      filterValues: resetFilters(context.allFilters)
    });
  }, [context, setContext]);

  // Helper function to check if a question has any selected filters
  const hasSelectedFilters = useCallback((question: QuestionTab): boolean => {
    const selectedValue = filterValues[question.code];

    // For single select questions (SINGLE, BOOLEAN, HIERARCHY), check if there's a selected value with a code
    if (question.inputType === 'SINGLE' || question.inputType === 'BOOLEAN' || question.inputType === 'HIERARCHY') {
      return selectedValue && selectedValue.code;
    }

    // For multi select questions, check if array has any items
    if (question.inputType === 'MULTI') {
      return Array.isArray(selectedValue) && selectedValue.length > 0;
    }

    return false;
  }, [filterValues]);


  return (
    <Box sx={styles.container(config.sidebarWidth)}>
      <Box sx={styles.leftBlock}>
        <Box sx={styles.header}>
          <Typography variant='h4'>Questions</Typography>
          <Button variant="outlined" onClick={handleResetFilters}>Reset</Button>
        </Box>
        <Box sx={styles.tabs}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            onChange={handleChange}
            value={value}
          >
            {questionsTabs?.map((question, index) => (
              <Tab
                key={index}
                label={<Box sx={styles.tabLabel}>
                  <Typography variant='body2'>{question?.question}</Typography>
                  <Box sx={styles.checkIcon(hasSelectedFilters(question))}>
                    <CheckCircleOutlineIcon color="inherit" />
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