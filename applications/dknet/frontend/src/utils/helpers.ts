import { IFilter } from "../context/Interfaces";
import { FilterType } from "../config/enums";

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
