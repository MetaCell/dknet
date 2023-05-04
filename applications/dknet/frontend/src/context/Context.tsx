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
  })

  const filterLabels= (context) => {
    if(context.filterValues.DataType){
      context.allFilters[0].options = context.filterValues.DataType
    }
    if(context.filterValues.DomainType){
      context.allFilters[1].options = context.filterValues.DomainType
    }
    context.allRepositories.map((repo) => {
      repo.attributes.DataType.filter((item) => item === "multiple-data-types")
    })
    console.log("repos: ", context.allRepositories)
  }
 
  return (
    <FilterContext.Provider value={{ context, setContext }}>
      <FilterUpdateContext.Provider value={filterLabels}>
        {children}
      </FilterUpdateContext.Provider>
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => useContext(FilterContext)
export const useFilterUpdateContext = () => useContext(FilterUpdateContext) 
