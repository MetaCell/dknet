import React from "react";
import { Box } from '@mui/material';
import QuestionSidebar from './QuestionSidebar';
import QuestionContent from './QuestionContent';
import PreviewPanel from './PreviewPanel';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { useFilterLogic } from './hooks/useFilterLogic';
import { useResponsiveConfig } from './hooks/useResponsiveConfig';
import { FilterQuestionsProps } from './types';
import { vars } from '../../theme/variables';

const { grey200, primary25, primary600, grey100, grey300 } = vars;

export const Item: React.FC<{ children: React.ReactNode; className?: string; onClick?: (e: React.MouseEvent) => void }> = ({
  children,
  className,
  onClick
}) => {
  const isChecked = className?.includes('checked-state');

  return (
    <Box
      onClick={onClick}
      sx={{
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
      }}
    >
      {children}
    </Box>
  );
};

const FilterQuestions: React.FC<FilterQuestionsProps> = ({
  questionsTabs,
  onClickNext,
  onClickPrev,
  progress,
  handleChange,
  value,
  closeDialog,
  showPreview
}) => {
  const config = useResponsiveConfig();
  const { isFiltersEmpty, handleSingleOptionSelect, filterValues, results } = useFilterLogic();

  const isLastQuestion = questionsTabs.length - 1 === value;
  useKeyboardNavigation({
    onNext: onClickNext,
    isLastQuestion
  });

  const handleNextStep = () => {
    onClickNext();
  };

  const handlePreviousStep = () => {
    onClickPrev();
  };

  const handleOptionSelect = (question: any, data: any) => {
    handleSingleOptionSelect(question, data);
  };

  const currentQuestion = questionsTabs[value];

  return (
    <Box sx={{ height: '100%', display: 'flex', backgroundColor: grey100 }}>
      <QuestionSidebar
        questionsTabs={questionsTabs}
        value={value}
        handleChange={handleChange}
        progress={progress}
        config={config}
        filterValues={filterValues}
      />

      <Box sx={{
        width: showPreview ? `calc(100% - ${config.sidebarWidth} - ${config.previewWidth})` : `calc(100% - ${config.sidebarWidth})`,
        borderLeft: `0.0625rem solid ${grey300}`,
        height: '100%',
        display: 'flex',
        overflow: 'hidden',
        transition: 'width 0.3s ease-in-out',
      }}>
        <Box sx={{ width: '100%', height: '100%' }}>
          <QuestionContent
            currentQuestion={currentQuestion}
            config={config}
            value={value}
            questionsTabs={questionsTabs}
            onOptionClick={handleOptionSelect}
            onNext={handleNextStep}
            onPrev={handlePreviousStep}
            closeDialog={closeDialog}
          />
        </Box>
      </Box>

      <PreviewPanel
        showPreview={showPreview}
        config={config}
        isFiltersEmpty={isFiltersEmpty}
        results={results}
        closeDialog={closeDialog}
      />
    </Box>
  );
};

export default FilterQuestions;

