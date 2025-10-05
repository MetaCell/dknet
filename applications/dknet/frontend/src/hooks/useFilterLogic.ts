import { useCallback, useMemo } from 'react';
import { useFilterContext } from '../context/Context';
import { QuestionTab } from '../utils/types';

export const useFilterLogic = () => {
  const { context, setContext } = useFilterContext();

  const isFiltersEmpty = useMemo(() => {
    return Object.values(context.filterValues).every(value => value === undefined);
  }, [context.filterValues]);

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
        showAll: false,
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
    isFiltersEmpty,
    handleSingleOptionSelect,
    isOptionSelectedForMultiple,
    isOptionSelectedForSingle,
    filterValues: context.filterValues,
    results: context.results
  };
};