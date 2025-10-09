import { useCallback } from 'react';
import { useFilterContext } from '../context/Context';
import { QuestionTab } from '../utils/types';
import { isFiltersEmpty as isFiltersEmptyHelper } from '../utils/helpers';

export const useFilterLogic = () => {
  const { context, setContext } = useFilterContext();

  const handleSingleOptionSelect = useCallback((question: QuestionTab, data: any) => {
    const currentValue = context?.filterValues[question.code];

    if (currentValue?.code !== data?.code) {
      // Select the option
      setContext({
        ...context,
        showAll: false,
        filterValues: {
          ...context.filterValues,
          [question.code]: data
        }
      });
    } else {
      // Deselect the option
      const newFilterValues = { ...context.filterValues };
      delete newFilterValues[question.code];
      
      setContext({
        ...context,
        showAll: true,
        filterValues: newFilterValues
      });
    }
  }, [context, setContext]);

  const isOptionSelectedForMultiple = useCallback((question: QuestionTab, data: any): boolean => {
    const selectedValues = context?.filterValues[question.code];
    return selectedValues?.filter((selectedValue: any) => selectedValue?.code === data?.code).length > 0;
  }, [context.filterValues]);

  const isOptionSelectedForSingle = useCallback((question: QuestionTab, data: any): boolean => {
    return context?.filterValues[question.code]?.code === data?.code;
  }, [context.filterValues]);

  return {
    context,
    isFiltersEmpty: isFiltersEmptyHelper(context.filterValues),
    handleSingleOptionSelect,
    isOptionSelectedForMultiple,
    isOptionSelectedForSingle,
    filterValues: context.filterValues,
    results: context.results
  };
};