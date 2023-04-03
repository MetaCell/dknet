import React, { createContext, useContext, useState } from "react"
import { ROWS_PER_PAGE } from "../config/constants"
import filters from '../resources/filters.json'
import repositories from '../resources/repositories.json'
import { FilterType } from '../config/enums'

export const FilterContext = createContext()

const booleanFilterInitialState = (filter) => (
  {
    [filter.code]: filter.options[0],
  }
)

const singleFilterInitialState = (filter) => (
  {
    [filter.code]: undefined,
  }
)

const multipleFilterInitialState = (filter) => (
  {
    [filter.code]: undefined,
  }
)

const filterInitialState = (filter) => {
  switch(filter.inputType) {
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
  const [context, setContext] = useState({ // initial state, I suggest also to create an interface
    pageNumber: 0,
    rowsPerPage: ROWS_PER_PAGE,
    filterValues: filters.reduce((a, filter) => {
      return (
        { 
          ...a,
          ...filterInitialState(filter)
        })
    }, {}),
    allFilters: filters,
    allRepositories: repositories
  })
  
  return (
    <FilterContext.Provider value={{ context, setContext }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => useContext(FilterContext)