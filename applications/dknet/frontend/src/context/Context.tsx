import React, { createContext, useContext, useState } from "react"
import { ROWS_PER_PAGE } from "../config/constants"
import filters from '../resources/filters.json'
import repositories from '../resources/repositories.json'
import { IFilter, IFilterContext, IRepository } from './Interfaces'
import { resetFilters } from "../utils/helpers";

export const FilterContext = createContext(null)

const mapFilter = (filter: IFilter): IFilter => ({
  ...filter,
  weighting: filter?.weighting || 1,
  options: filter.options.map((option) => ({
    ...option,
    color: option.color?.toLowerCase() || 'info',
    weighting: option?.weighting || 1,
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
    const filterValues = { ...newContext.filterValues }
    Object.entries(filterValues).forEach(([key, value]) => {
      if(value === undefined || (Array.isArray(value) && value.length===0)) {
        delete filterValues[key]
      }
    })
    const usedFilters = newContext.allFilters.filter(f => Object.keys(filterValues).includes(f.code))
    newContext.allRepositories = newContext.allRepositories.map((r) => ({
      ...r,
      score: 0
    }))
    // start scoring the repositories
    usedFilters.forEach(filter => {
      const value = filterValues[filter.code]
      const filterValue = Array.isArray(value) ? value : [value]
      newContext.allRepositories.forEach((repository) => {
        const repositoryFilterValue = repository.attributes[filter.code]

        const filterScore = filterValue.reduce((score, fv) => {
          // every repository attribute value that matches a chosen filter option counts for 1 point
          return score + (repositoryFilterValue.includes(fv.code) ? fv.weighting : 0)
        }, 0)
        repository.score += filterScore * filter.weighting
      })
    })
    // compute max possible score from filtervalues
    const maxPossibleScore = usedFilters.reduce((c, filter) => {
      const value = filterValues[filter.code]
      const filterValue = Array.isArray(value) ? value : [value]
      return c + filter.weighting * filterValue.reduce((c2, filterOption) => c2 + filterOption.weighting, 0)
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
