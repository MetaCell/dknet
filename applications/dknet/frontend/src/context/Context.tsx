import React, { createContext, useContext, useState } from "react"
import { ROWS_PER_PAGE } from "../config/constants"
import filters from '../resources/filters.json'
import repositories from '../resources/repositories.json'
import { IFilter, IFilterContext, IRepository } from './Interfaces'
import { resetFilters } from "../utils/helpers";

export const FilterContext = createContext(null)
export const FilterUpdateContext = createContext(null)
export const FilterSortContext = createContext(null)

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
    filterValues: resetFilters(),
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

  const filterLabels= (context) => {

    if(context.filterValues.DataType){
      context.allFilters[0].options = context.filterValues.DataType
    }
    if(context.filterValues.DomainType){
      context.allFilters[1].options = context.filterValues.DomainType
    }
  }
 
  return (
    <FilterContext.Provider value={{ context, setContext }}>
      <FilterSortContext.Provider value={sortRepositories}>
        {children}
      </FilterSortContext.Provider>
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => useContext(FilterContext)
export const useFilterUpdateContext = () => useContext(FilterUpdateContext)
export const useFilterSortContext = () => useContext(FilterSortContext)
