import { IFilter } from "../context/Interfaces";
import { FilterType } from "../config/enums";
import filters from "../resources/filters.json";

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

const filterInitialState = (filter: IFilter) => {
  switch (filter.inputType) {
    case FilterType.Boolean:
      return booleanFilterInitialState(filter)
    case FilterType.Single:
      return singleFilterInitialState(filter)
    case FilterType.Multiple:
      return multipleFilterInitialState(filter)
  }
  return singleFilterInitialState(filter)
}

export const resetFilters = () => {
  return filters.reduce((a, filter) => {
    return (
      {
        ...a,
        ...filterInitialState(filter as IFilter)
      })
  }, {})
}
