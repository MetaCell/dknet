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
  const updateFilter = (newValue, filter) => {
    console.log('filter', filter.code[1])
    console.log('new value: ', newValue[0].code)
    let filteredData = repositories.map((repository) => mapRepository(repository as IRepository))

    if(newValue && filter){
      for(const prop in newValue){
        filteredData = context.allRepositories.filter(obj => obj.attributes[filter.code][prop] === newValue[prop].code);
      }
    }

    setContext({
      ...context,
      filterValues: {
        ...context.filterValues,
        [filter.code]: newValue
      }, 
      allRepositories: filteredData
    })
  }

  return (
    <FilterContext.Provider value={{ context, setContext }}>
      <FilterUpdateContext.Provider value={updateFilter}>
        {children}
      </FilterUpdateContext.Provider>
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => useContext(FilterContext)
export const useFilterUpdateContext = () => useContext(FilterUpdateContext)
