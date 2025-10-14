import React, { useCallback } from 'react';
import { Box, Typography, Stack, Tooltip, Slide } from '@mui/material';
import QuestionBox from './QuestionBox';
import CheckBoxWidget from '../widgets/CheckBox';
import DialogStepFooter from './DialogStepFooter';
import ExpandableText from '../ExpandableText';
import { vars } from '../../theme/variables';
import { QuestionTab } from '../../utils/types';
import { INPUT_TYPES, MIN_CONTENT_WIDTH } from '../../utils/constants';
import { useFilterLogic } from '../../hooks/useFilterLogic';

const { grey200, primary25, primary600 } = vars;

const styles = {
  getItemSx: (isChecked: boolean) => ({
    border: `0.0625rem solid ${grey200}`,
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    background: isChecked ? primary25 : 'transparent',
    boxShadow: isChecked ? `0 0 0 0.0625rem ${primary600}` : 'none',
    width: '100%',
    minHeight: '3rem',
    padding: 2,

    '&:hover': {
      border: `0.0625rem solid`,
      borderColor: 'primary.main',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
  }),

  mainContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  slideContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
    overflow: 'auto',
    pt: 4,
    pb: 2,
    px: 3,
  },

  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexShrink: 0,
    mb: 2,
  },

  headerStack: {
    width: '100%',
    textAlign: 'center'
  },

  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    minHeight: '20rem',
  },

  footerContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexShrink: 0,
    width: '100%',
    pb: 4,
    pt: 2,
    px: 3,
  },

  getMultipleChoiceContainer: (optionsCount: number) => {
    const shouldUseGrid = optionsCount > 3;
    const shouldExpandHeight = optionsCount <= 3;

    return {
      display: 'grid',
      gridTemplateColumns: shouldUseGrid ? 'repeat(2, 1fr)' : '1fr',
      gridTemplateRows: shouldExpandHeight ? `repeat(3, 1fr)` : 'auto',
      gap: 1.5,
      width: '100%',
      ...(shouldExpandHeight && { flex: 1, height: '100%' }),
    };
  },

  getMultipleChoiceItem: (shouldExpandHeight: boolean, isLastItem: boolean) => ({
    ...(shouldExpandHeight && { height: '100%' }),
    display: 'flex',
    alignItems: 'center',
    marginBottom: isLastItem ? 1.5 : 0,

    '& .MuiTypography-root': {
      color: vars.grey700,
      fontWeight: 500,
    }
  }),

  getSingleChoiceContainer: (optionsCount: number) => {
    const shouldExpandHeight = optionsCount <= 3;

    return {
      width: '100%',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: shouldExpandHeight ? 'repeat(3, 1fr)' : 'auto',
      gap: 1.5,
      ...(shouldExpandHeight && { flex: 1, height: '100%' }),

      '& .MuiTypography-root': {
        color: vars.grey700,
        fontWeight: 500,
      }
    };
  },

  getSingleChoiceItem: (shouldExpandHeight: boolean, isLastItem: boolean) => ({
    ...(shouldExpandHeight && { height: '100%' }),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isLastItem ? 1.5 : 0,
  }),
};

interface QuestionContentProps {
  currentQuestion: QuestionTab;
  value: number;
  questionsTabs: QuestionTab[];
  onOptionClick: (question: QuestionTab, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
  closeDialog: () => void;
}

const QuestionContent: React.FC<QuestionContentProps> = ({
  currentQuestion,
  value,
  questionsTabs,
  onOptionClick,
  onNext,
  onPrev,
  closeDialog
}) => {
  const { isOptionSelectedForMultiple, isOptionSelectedForSingle } = useFilterLogic();
  const isMultipleChoice = currentQuestion?.inputType === INPUT_TYPES.MULTI;

  const getCheckedStateForMultiple = useCallback((question: QuestionTab, data: any): string => {
    return isOptionSelectedForMultiple(question, data) ? 'checked-state' : '';
  }, [isOptionSelectedForMultiple]);

  const getCheckedStateForSingle = useCallback((question: QuestionTab, data: any): string => {
    return isOptionSelectedForSingle(question, data) ? 'checked-state' : '';
  }, [isOptionSelectedForSingle]);

  const handleOptionClick = useCallback((e: React.MouseEvent, data: any) => {
    e.preventDefault();
    onOptionClick(currentQuestion, data);
  }, [onOptionClick, currentQuestion]);

  const renderMultipleChoiceOptions = () => {
    const optionsCount = currentQuestion?.options.length || 0;
    const shouldExpandHeight = optionsCount <= 3;

    return (
      <Box sx={styles.getMultipleChoiceContainer(optionsCount)}>
        {currentQuestion?.options.map((data, index) => {
          const isLastItem = index === currentQuestion?.options.length - 1;
          return (
            <Tooltip arrow title={data.label} key={data?.label}>
              <Box sx={{
                ...styles.getItemSx(getCheckedStateForMultiple(currentQuestion, data) === 'checked-state'),
                ...styles.getMultipleChoiceItem(shouldExpandHeight, isLastItem),
              }}>
                <CheckBoxWidget
                  data={data}
                  filter={currentQuestion}
                />
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    );
  };

  const renderSingleChoiceOptions = () => {
    const optionsCount = currentQuestion?.options.length || 0;
    const shouldExpandHeight = optionsCount <= 3;

    return (
      <Box sx={styles.getSingleChoiceContainer(optionsCount)}>
        {currentQuestion?.options.map((data, index) => {
          const isLastItem = index === currentQuestion?.options.length - 1;
          return (
            <Box
              key={`itemKey_${index}`}
              sx={{
                ...styles.getItemSx(getCheckedStateForSingle(currentQuestion, data) === 'checked-state'),
                ...styles.getSingleChoiceItem(shouldExpandHeight, isLastItem),
              }}
              onClick={(e) => handleOptionClick(e, data)}
            >
              <Typography
                variant="h4"
              >
                {data.label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <Box sx={styles.mainContainer}>
      <Slide
        key={value}
        direction="up"
        in={true}
        timeout={600}
        appear
      >
        <Box maxWidth={MIN_CONTENT_WIDTH} width="100%" sx={styles.slideContainer}>
          <Box sx={styles.headerContainer}>
            <Stack sx={styles.headerStack} spacing={1}>
              <Typography textAlign="left" variant="h3">
                {currentQuestion.questionTitle}
              </Typography>
              <ExpandableText
                text={currentQuestion.questionSubtitle}
              />
            </Stack>
          </Box>

          <Box sx={styles.contentContainer}>
            <QuestionBox inputType={currentQuestion.inputType}>
              {isMultipleChoice ? renderMultipleChoiceOptions() : renderSingleChoiceOptions()}
            </QuestionBox>
          </Box>
        </Box>
      </Slide>
      {/* Fixed Footer - Always Visible */}
      <Box sx={styles.footerContainer}>
        <Box maxWidth={MIN_CONTENT_WIDTH} width="100%">
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