import React, { createContext, useContext, useState } from "react"
import { ROWS_PER_PAGE } from "../config/constants"
import filters from '../resources/filters.json'
import repositories from '../resources/repositories.json'
import { FilterType } from '../config/enums'
import { IFilter, IFilterContext, IRepository } from './Interfaces'

export const FilterContext = createContext(null)
export const FilterUpdateContext = createContext(null)

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

const mapFilter = (filter: IFilter): IFilter => ({
  ...filter,
  options: filter.options.map((option) => ({
    ...option,
    color: option.color?.toLowerCase() || 'info'
  }))
})

const mapRepository = (repository: IRepository): IRepository => ({
  ...repository,
  attributes: Object.entries(repository.attributes).reduce((a, attribute) => ({
    ...a,
    [attribute[0]]: attribute[1],
  }), {})
})

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
    allFilters: filters.map((filter) => mapFilter(filter as IFilter)),
    allRepositories: repositories.map((repository) => mapRepository(repository as IRepository))
  });

  const sortRepositories = (sortValue:string) => {

    if(sortValue === 'Alphabetical (A-Z)'){
      const newRepositories = context.allRepositories.sort((a, b) => a.label.localeCompare(b.label));
      setContext(
        {
          ...context, 
          allRepositories: newRepositories
        }
      )
    }
    else if(sortValue === 'Alphabetical (Z-A)'){
      const newRepositories = context.allRepositories.sort((a, b) => a.label.localeCompare(b.label)).reverse();
      setContext(
        {
          ...context, 
          allRepositories: newRepositories
        }
      )
    }
    else {
      const newRepositories = repositories.map((repository) => mapRepository(repository as IRepository))
      setContext(
        {
          ...context, 
          allRepositories: newRepositories
        }
      )
    }
  }

  return (
    <FilterContext.Provider value={{ context, setContext }}>
      <FilterUpdateContext.Provider value={sortRepositories}>
        {children}
      </FilterUpdateContext.Provider>
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => useContext(FilterContext)
export const useFilterUpdateContext = () => useContext(FilterUpdateContext)