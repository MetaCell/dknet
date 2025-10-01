import React from 'react';
import { Box, Typography, RadioGroup, Stack, Tooltip } from '@mui/material';
import QuestionBox from './QuestionBox';
import CheckBoxWidget from '../widgets/CheckBox';
import FilterDialogRadio from './FilterDialogRadio';
import DialogStepFooter from './DialogStepFooter';
import { vars } from '../../theme/variables';
import { QuestionTab, ResponsiveConfig } from './types';
import { INPUT_TYPES, CSS_CLASSES } from './constants';

const { grey600, grey200, primary25, primary600 } = vars;

// Item styles as sx prop function
const getItemSx = (isChecked: boolean) => ({
  display: 'flex',
  border: `0.0625rem solid ${grey200}`,
  borderRadius: '0.75rem',
  width: '100%',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  background: isChecked ? primary25 : 'transparent',
  boxShadow: isChecked ? `0 0 0 0.0625rem ${primary600}` : 'none',
  '& .MuiFormControlLabel-root': {
    margin: 0,
    padding: 2,
  },
  '& .MuiCheckbox-root': {
    padding: 0
  },
  '& .MuiTypography-body1': {
    color: 'grey.700',
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
    color: 'grey.700',
    fontWeight: 500,
    fontSize: '0.875rem',
    marginTop: '0.5rem'
  },
  '&:hover': {
    border: `0.0625rem solid`,
    borderColor: 'primary.main',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
});

interface QuestionContentProps {
  currentQuestion: QuestionTab;
  config: ResponsiveConfig;
  value: number;
  questionsTabs: QuestionTab[];
  filterValues: any;
  onOptionClick: (question: QuestionTab, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  closeDialog: () => void;
}

const QuestionContent: React.FC<QuestionContentProps> = ({
  currentQuestion,
  config,
  value,
  questionsTabs,
  filterValues,
  onOptionClick,
  onNext,
  onPrev,
  closeDialog
}) => {
  const isMultipleChoice = currentQuestion?.inputType === INPUT_TYPES.MULTI;

  const getCheckedStateForMultiple = (question: QuestionTab, data: any): string => {
    const selectedValues = filterValues[question.code] || [];
    return selectedValues.filter((selectedValue: any) => selectedValue?.code === data?.code).length > 0
      ? CSS_CLASSES.CHECKED_STATE
      : '';
  };

  const getCheckedStateForSingle = (question: QuestionTab, data: any): string => {
    return filterValues[question.code]?.code === data?.code ? CSS_CLASSES.CHECKED_STATE : '';
  };

  const getGridColumns = (optionsLength: number) => {
    const { gridCols } = config;

    if (optionsLength === 2) {
      return gridCols[2];
    }
    if (optionsLength === 4) {
      return gridCols[4];
    }
    return gridCols[3];
  };

  const handleOptionClick = (e: React.MouseEvent, data: any) => {
    e.preventDefault();
    onOptionClick(currentQuestion, data);
  };

  const renderMultipleChoiceOptions = () => (
    currentQuestion?.options.map((data) => (
      <Tooltip title={data.label} key={data?.label}>
        <Box sx={getItemSx(getCheckedStateForMultiple(currentQuestion, data) === CSS_CLASSES.CHECKED_STATE)}>
          <CheckBoxWidget
            data={data}
            filter={currentQuestion}
          />
        </Box>
      </Tooltip>
    ))
  );

  const renderSingleChoiceOptions = () => (
    <RadioGroup
      sx={{
        width: '100%',
        display: 'grid !important',
        gap: 1.5,
        gridTemplateColumns: getGridColumns(currentQuestion?.options.length)
      }}
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue=""
      name="radio-buttons-group"
      value={filterValues[currentQuestion?.code]?.code || ''}
    >
      {currentQuestion?.options.map((data, index) => (
        <Box
          key={`itemKey_${index}`}
          sx={getItemSx(getCheckedStateForSingle(currentQuestion, data) === CSS_CLASSES.CHECKED_STATE)}
          onClick={(e) => handleOptionClick(e, data)}
        >
          <FilterDialogRadio
            data={data}
            filter={data}
            question={currentQuestion}
          />
        </Box>
      ))}
    </RadioGroup>
  );

  if (!currentQuestion) {
    return null;
  }

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
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
          <Typography textAlign="left" variant="h3">
            {currentQuestion.questionTitle}
          </Typography>
          <Typography textAlign="left" variant="h5" color={grey600}>
            {currentQuestion.questionSubtitle}
          </Typography>
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
          <QuestionBox inputType={currentQuestion.inputType}>
            {isMultipleChoice ? renderMultipleChoiceOptions() : renderSingleChoiceOptions()}
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
          <DialogStepFooter
            handlePrev={onPrev}
            value={value}
            closeDialog={closeDialog}
            questionsTabs={questionsTabs}
            handleNext={onNext}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default QuestionContent;