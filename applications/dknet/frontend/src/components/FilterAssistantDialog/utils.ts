import { QuestionTab } from './types';

/**
 * Generates accessibility props for tabs
 */
export const createA11yProps = (index: number) => ({
  id: `vertical-tab-${index}`,
  'aria-controls': `vertical-tabpanel-${index}`,
});

/**
 * Determines the checked state class for multiple selection options
 */
export const getMultipleSelectionCheckedState = (
  question: QuestionTab, 
  data: any, 
  filterValues: any
): string => {
  const selectedValues = filterValues[question.code] || [];
  const isSelected = selectedValues.filter(
    (selectedValue: any) => selectedValue?.code === data?.code
  ).length > 0;

  return isSelected ? 'checked-state' : '';
};

/**
 * Determines the checked state class for single selection options
 */
export const getSingleSelectionCheckedState = (
  question: QuestionTab, 
  data: any, 
  filterValues: any
): string => {
  return filterValues[question.code]?.code === data?.code 
    ? 'checked-state' 
    : '';
};

/**
 * Scrolls to a specific result element
 */
export const scrollToResult = (index: number): void => {
  const element = document.getElementById(`result_${index}`);
  element?.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Determines if a result is the top match
 */
export const isTopMatch = (result: any, results: any[], index: number): boolean => {
  return (index === 0 || result.pctMatch === results[0]?.pctMatch) && !isNaN(result.pctMatch || 0);
};

/**
 * Formats the primary text for a result item
 */
export const formatResultPrimaryText = (result: any): string => {
  return !isNaN(result.pctMatch || 0) 
    ? `${result.label} ${result.pctMatch}%` 
    : result.label;
};