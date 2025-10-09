import { IFilter } from "../context/Interfaces";
import { FilterType } from "../config/enums";
import { ResultItem } from "./types";

const booleanFilterInitialState = (filter: IFilter) => (
  {
    [filter.code]: undefined,
  }
)

const singleFilterInitialState = (filter: IFilter) => (
  {
    [filter.code]: undefined,
  }
)

const multipleFilterInitialState = (filter: IFilter) => (
  {
    [filter.code]: undefined,
  }
)

const hierarchyFilterInitialState = (filter: IFilter) => (
  {
    [filter.code]: undefined,
  }
)

const filterInitialState = (filter: IFilter) => {
  switch (filter.inputType) {
    case FilterType.Boolean:
      return booleanFilterInitialState(filter)
    case FilterType.Single:
      return singleFilterInitialState(filter)
    case FilterType.Multiple:
      return multipleFilterInitialState(filter)
    case FilterType.Hierarchy:
      return hierarchyFilterInitialState(filter)
  }
  return singleFilterInitialState(filter)
}

export const resetFilters = (filters) => {
  return filters.reduce((a, filter) => {
    return (
      {
        ...a,
        ...filterInitialState(filter as IFilter)
      })
  }, {})
}

export const isTopMatch = (item: ResultItem, index: number, results: ResultItem[]): boolean => {
  if (results.length === 0 || isNaN(item.pctMatch || 0)) {
    return false;
  }
  return index === 0 || item.pctMatch === results[0].pctMatch;
}

export const hasActiveFilters = (filterValues: { [key: string]: any }): boolean => {
  return Object.values(filterValues).some(value => 
    value !== undefined && value !== null && 
    (Array.isArray(value) ? value.length > 0 : true)
  );
}

export const isFiltersEmpty = (filterValues: { [key: string]: any }): boolean => {
  return Object.values(filterValues).every(value => value === undefined);
}
