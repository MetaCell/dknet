import React, { useCallback } from "react";
import { Box } from '@mui/material';
import QuestionSidebar from './QuestionSidebar';
import QuestionContent from './QuestionContent';
import PreviewPanel from './PreviewPanel';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { useFilterLogic } from '../../hooks/useFilterLogic';
import { FilterQuestionsProps } from '../../utils/types';
import { vars } from '../../theme/variables';
import { useSidebarVisibility } from "../../hooks/useSidebarVisibility";
import { PREVIEW_WIDTH, SIDEBAR_WIDTH } from "../../utils/constants";

const { grey100, grey300 } = vars;

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    backgroundColor: grey100
  },
  contentWrapper: {
    borderLeft: `0.0625rem solid ${grey300}`,
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    transition: 'width 0.3s ease-in-out',
  },
  innerContent: {
    width: '100%',
    height: '100%'
  },
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
  const { isFiltersEmpty, handleSingleOptionSelect, filterValues, results } = useFilterLogic();
  const { showSidebar } = useSidebarVisibility({ showPreview });

  const isLastQuestion = questionsTabs.length - 1 === value;
  useKeyboardNavigation({
    onNext: onClickNext,
    isLastQuestion
  });

  const handleNextStep = useCallback(() => {
    onClickNext();
  }, [onClickNext]);

  const handlePreviousStep = useCallback(() => {
    onClickPrev();
  }, [onClickPrev]);

  const handleOptionSelect = useCallback((question: any, data: any) => {
    handleSingleOptionSelect(question, data);
  }, [handleSingleOptionSelect]);

  const currentQuestion = questionsTabs[value];

  // Calculate main content width based on sidebar and preview visibility
  const getMainContentWidth = useCallback(() => {
    const sidebarWidth = showSidebar ? SIDEBAR_WIDTH : '0';
    if (showPreview) {
      return `calc(100% - ${sidebarWidth} - ${PREVIEW_WIDTH})`;
    }
    return `calc(100% - ${sidebarWidth})`;
  }, [showSidebar, showPreview]);

  return (
    <Box sx={styles.container}>
      <Box sx={{
        width: showSidebar ? SIDEBAR_WIDTH : '0',
        minWidth: showSidebar ? SIDEBAR_WIDTH : '0',
        maxWidth: showSidebar ? SIDEBAR_WIDTH : '0',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        opacity: showSidebar ? 1 : 0,
        transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)',
      }}>
        <QuestionSidebar
          questionsTabs={questionsTabs}
          value={value}
          handleChange={handleChange}
          progress={progress}
          filterValues={filterValues}
        />
      </Box>

      <Box sx={{ ...styles.contentWrapper, width: getMainContentWidth() }}>
        <Box sx={styles.innerContent}>
          <QuestionContent
            currentQuestion={currentQuestion}
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
        isFiltersEmpty={isFiltersEmpty}
        results={results}
        closeDialog={closeDialog}
      />
    </Box>
  );
};

export default FilterQuestions;

