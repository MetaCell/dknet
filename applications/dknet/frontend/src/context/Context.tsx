import React, { createContext, useContext, useState } from "react"
import { ROWS_PER_PAGE } from "../config/constants"
import filters from '../resources/filters.json'
import repositories from '../resources/repositories.json'
import { FilterType } from '../config/enums'
import { IFilter, IFilterContext, IRepository } from './ContextInterfaces'

export const FilterContext = createContext(null)

const booleanFilterInitialState = (filter: IFilter) => (
  {
    [filter.code]: filter.options[0],
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

export const FilterProvider = ({ children }) => {
  const [context, setContext] = useState<IFilterContext>({
    pageNumber: 0,
    rowsPerPage: ROWS_PER_PAGE,
    filterValues: filters.reduce((a, filter) => {
      return (
        {
          ...a,
          ...filterInitialState(filter as IFilter)
        })
    }, {}),
    allFilters: filters as IFilter[],
    allRepositories: repositories as IRepository[]
  })

  return (
    <FilterContext.Provider value={{ context, setContext }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => useContext(FilterContext)