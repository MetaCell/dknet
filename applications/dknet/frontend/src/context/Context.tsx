import React, { createContext, useContext, useState } from "react"
import { ROWS_PER_PAGE } from "../config/constants"
import filters from '../resources/filters.json'
import repositories from '../resources/repositories.json'
import { IFilter, IFilterOptions, IFilterContext, IRepository } from './Interfaces'
import { resetFilters } from "../utils/helpers";

export const FilterContext = createContext(null)
export const FilterUpdateContext = createContext(null)

const mapFilter = (filter: IFilter): IFilter => ({
  ...filter,
  options: filter.options.map((option) => ({
    ...option,
    color: option.color?.toLowerCase() || 'info'
  }))
})

const mapRepository = (repository: IRepository): IRepository => ({
  ...repository,
  score: 0,
  attributes: Object.entries(repository.attributes).reduce((a, attribute) => ({
    ...a,
    [attribute[0]]: attribute[1],
  }), {})
})

export const FilterProvider = ({ children }) => {
  const [context, _setContext] = useState<IFilterContext>({
    pageNumber: 0,
    rowsPerPage: ROWS_PER_PAGE,
    filterValues: resetFilters(),
    sortBy: "score",
    allFilters: filters.map((filter) => mapFilter(filter as IFilter)),
    allRepositories: repositories.map((repository) => mapRepository(repository as IRepository))
  });

  const setContext = (newContext) => _setContext(_sortRepositories(scoreRepositories(newContext)))

  const scoreRepositories = (newContext: IFilterContext): IFilterContext => {
    const filterValues = Object.entries(newContext.filterValues).filter(([key, value]) => value !== undefined || (Array.isArray(value) && value.length===0))
    newContext.allRepositories = newContext.allRepositories.map((r) => ({
      ...r,
      score: 0
    }))
    // start scoring the repositories
    filterValues.forEach(([key, value]) => {
      const filterValue = Array.isArray(value) ? value : [value]
      newContext.allRepositories.forEach((repository) => {
        const repositoryFilterValue = repository.attributes[key]
        filterValue.forEach((fv) => {
          // every repository attribute value that matches a chosen filter option counts for 1 point
          const score = repositoryFilterValue.includes(fv.code) ? 1 : 0
          repository.score += score
        })
      })
    })
    const maxPossibleScore = filterValues.reduce((currentValue, fv) => {
      // compute max possible score from filtervalues
      const numberOfPointsPerOptions = 1 // each option is 1 point
      if(Array.isArray(fv[1])) {
        return currentValue + fv[1].length * numberOfPointsPerOptions // length of array * number of points per option
      }
      return currentValue + 1 * numberOfPointsPerOptions // numer of points * 1 option
    }, 0)

    // compute the % match by dividing the score by the max possible score
    newContext.allRepositories = newContext.allRepositories.map((r) => ({
      ...r,
      pctMatch: Math.round((r.score / maxPossibleScore * 100))
    }))
    return newContext
  }

  const _sortRepositories = (newContext: IFilterContext): IFilterContext => {
    let allRepositories = newContext.allRepositories
    if(newContext.sortBy === 'Alphabetical (A-Z)'){
      allRepositories = newContext.allRepositories.sort((a, b) => a.label.localeCompare(b.label));
    }
    else if(newContext.sortBy === 'Alphabetical (Z-A)'){
      allRepositories = newContext.allRepositories.sort((a, b) => a.label.localeCompare(b.label)).reverse();
    }
    else {
      allRepositories = newContext.allRepositories.sort((a, b) => b.score - a.score || a.label.localeCompare(b.label)) //repositories.map((repository) => mapRepository(repository as IRepository))
    }
    return {
      ...newContext,
      allRepositories: allRepositories
    }
  }

  const sortRepositories = (sortValue:string) => {
    _setContext({
      ..._sortRepositories(scoreRepositories(context)),
      sortBy: sortValue
    })
  }
 
  return (
    <FilterContext.Provider value={{ context, setContext, scoreRepositories, sortRepositories }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => useContext(FilterContext)
export const useFilterUpdateContext = () => useContext(FilterUpdateContext)
