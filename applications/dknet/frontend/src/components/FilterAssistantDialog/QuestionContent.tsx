import React from 'react';
import { Box, Typography, Stack, Tooltip, Slide } from '@mui/material';
import QuestionBox from './QuestionBox';
import CheckBoxWidget from '../widgets/CheckBox';
import DialogStepFooter from './DialogStepFooter';
import { vars } from '../../theme/variables';
import { QuestionTab, ResponsiveConfig } from './types';
import { INPUT_TYPES } from './constants';
import { useFilterLogic } from './hooks/useFilterLogic';

const { grey600, grey200, primary25, primary600 } = vars;

// Item styles as sx prop function
const getItemSx = (isChecked: boolean) => ({
  border: `0.0625rem solid ${grey200}`,
  borderRadius: '0.75rem',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  background: isChecked ? primary25 : 'transparent',
  boxShadow: isChecked ? `0 0 0 0.0625rem ${primary600}` : 'none',
  width: '100%',
  minHeight: '3rem',

  '& .MuiFormControlLabel-root': {
    margin: 0,
    padding: 2,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    minHeight: 'inherit',
  },
  '& .MuiFormControlLabel-label': {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: '0.25rem',
  },
  '& .MuiCheckbox-root': {
    padding: 0,
    alignSelf: 'center',
  },
  '& .MuiTypography-root': {
    color: 'grey.700',
    fontWeight: 500,
    fontSize: '0.875rem',
    flex: 1,
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    lineHeight: 1.4,
  },
  '& .MuiTypography-body1': {
    color: 'grey.700',
    marginLeft: '0.75rem',
    display: 'block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
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
  onOptionClick,
  onNext,
  onPrev,
  closeDialog
}) => {
  const { isOptionSelectedForMultiple, isOptionSelectedForSingle } = useFilterLogic();
  const isMultipleChoice = currentQuestion?.inputType === INPUT_TYPES.MULTI;

  const getCheckedStateForMultiple = (question: QuestionTab, data: any): string => {
    return isOptionSelectedForMultiple(question, data) ? 'checked-state' : '';
  };

  const getCheckedStateForSingle = (question: QuestionTab, data: any): string => {
    return isOptionSelectedForSingle(question, data) ? 'checked-state' : '';
  };

  const handleOptionClick = (e: React.MouseEvent, data: any) => {
    e.preventDefault();
    onOptionClick(currentQuestion, data);
  };

  const renderMultipleChoiceOptions = () => {
    const optionsCount = currentQuestion?.options.length || 0;
    const shouldUseGrid = optionsCount > 3;
    const shouldExpandHeight = optionsCount <= 3;

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: shouldUseGrid ? 'repeat(2, 1fr)' : '1fr',
          gridTemplateRows: shouldExpandHeight ? `repeat(3, 1fr)` : 'auto',
          gap: 1.5,
          width: '100%',
          ...(shouldExpandHeight && { flex: 1, height: '100%' }),
        }}
      >
        {currentQuestion?.options.map((data) => (
          <Tooltip title={data.label} key={data?.label}>
            <Box sx={{
              ...getItemSx(getCheckedStateForMultiple(currentQuestion, data) === 'checked-state'),
              ...(shouldExpandHeight && { height: '100%' }),
              display: 'flex',
              alignItems: 'center',
            }}>
              <CheckBoxWidget
                data={data}
                filter={currentQuestion}
              />
            </Box>
          </Tooltip>
        ))}
      </Box>
    );
  };

  const renderSingleChoiceOptions = () => {
    const optionsCount = currentQuestion?.options.length || 0;
    const shouldExpandHeight = optionsCount <= 3;

    return (
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridTemplateRows: shouldExpandHeight ? 'repeat(3, 1fr)' : 'auto',
          gap: 1.5,
          ...(shouldExpandHeight && { flex: 1, height: '100%' }),
        }}
      >
        {currentQuestion?.options.map((data, index) => (
          <Box
            key={`itemKey_${index}`}
            sx={{
              ...getItemSx(getCheckedStateForSingle(currentQuestion, data) === 'checked-state'),
              ...(shouldExpandHeight && { height: '100%' }),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              textAlign: 'center'
            }}
            onClick={(e) => handleOptionClick(e, data)}
          >
            <Typography
              variant="body1"
              sx={{
                padding: 2,
                width: '100%',
                color: 'grey.700',
                fontWeight: 500,
                fontSize: '0.875rem',
                whiteSpace: 'normal',
                wordWrap: 'break-word',
                lineHeight: 1.4,
              }}
            >
              {data.label}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4,
      px: 3
    }}>

      <Slide
        key={value}
        direction="up"
        in={true}
        timeout={600}
        appear
      >
        <Box maxWidth={config.questionMaxWidth} width="100%" sx={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexShrink: 0,
              mb: 2,
            }}
          >
            <Stack sx={{ width: '100%', textAlign: 'center' }} spacing={1}>
              <Typography textAlign="left" variant="h3">
                {currentQuestion.questionTitle}
              </Typography>
              <Typography textAlign="left" variant="h5" color={grey600}>
                {currentQuestion.questionSubtitle}
              </Typography>
            </Stack>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              flex: 1,
              minHeight: 0,
            }}
          >
            <QuestionBox inputType={currentQuestion.inputType}>
              {isMultipleChoice ? renderMultipleChoiceOptions() : renderSingleChoiceOptions()}
            </QuestionBox>
          </Box>
        </Box>
      </Slide>



      {/* Fixed Footer - Always Visible */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexShrink: 0,
          mt: 2,
          width: '100%',
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
    </Box >
  );
};

export default QuestionContent;