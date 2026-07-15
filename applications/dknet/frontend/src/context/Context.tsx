import React, { createContext, useContext, useState } from "react"
import { ROWS_PER_PAGE } from "../config/constants"
import getFilters from './FilterService';
import getRepositories from './RepositoryService';
import { IFilter, IFilterContext, IRepository } from './Interfaces'
import { resetFilters } from "../utils/helpers";
import { FilterType } from "../config/enums";

let filters = [];
let repositories = [];

const getData = async () => {
  filters = await getFilters();
  repositories = await getRepositories(filters);
  return { filters, repositories }
}

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
    filterValues: resetFilters(filters),
    sortBy: "score",
    allFilters: filters.map((filter) => mapFilter(filter as IFilter)),
    allRepositories: repositories.map((repository) => mapRepository(repository as IRepository)),
    allGeneralistRepositories: repositories.filter((repository) => {
      const generalistFilter = filters.find((filter) => filter.inputType === FilterType.ScoreBool);
      const priorityValue = generalistFilter.options[1].code;
      if (repository.attributes[generalistFilter.code].includes(priorityValue)) {
        return true;
      }
      return false;
    }).map((repository) => mapRepository(repository as IRepository)),
    results: [],
    filters: filters,
    showAll: false,
    currentView: 'launch',
  });

  const setContext = (newContext) => {
    // Automatically sync showAll with currentView
    const updatedContext = {
      ...newContext,
    };
    _setContext(_sortRepositories(scoreRepositories(filterRepositories(updatedContext))));
  };

  if (filters.length === 0 || repositories.length === 0) {
    getData().then((data) => {
      filters = data.filters;
      repositories = data.repositories;
      setContext({
        ...context,
        filters: filters,
        allFilters: filters.map((filter) => mapFilter(filter as IFilter)),
        allRepositories: repositories.map((repository) => mapRepository(repository as IRepository)),
        allGeneralistRepositories: repositories.filter((repository) => {
          const generalistFilter = filters.find((filter) => filter.inputType === FilterType.ScoreBool);
          const priorityValue = generalistFilter.options[1].code;
          if (repository.attributes[generalistFilter.code].includes(priorityValue)) {
            return true;
          }
          return false;
        }).map((repository) => mapRepository(repository as IRepository)),
      })
    });
  }

  const filterRepositories = (newContext: IFilterContext): IFilterContext => {
    const results = [];
    const filterValues = { ...newContext.filterValues }
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value === undefined || (Array.isArray(value) && value.length === 0)) {
        delete filterValues[key]
      }
    })
    const usedFilters = newContext.allFilters.filter(f => Object.keys(filterValues).includes(f.code));
    // start filtering the repositories
    newContext.allRepositories.forEach((repository) => {
      let match = true;
      if (usedFilters.length === 0) {
        match = false;
      }
      usedFilters.forEach(filter => {
        const value = filterValues[filter.code]
        const filterValue = Array.isArray(value) ? value : [value]
        const repositoryFilterValue = repository.attributes[filter.code]
        if (filter.inputType === FilterType.Hierarchy) {
          const selectedOptionIndex = filter.options.findIndex(opt => opt.code === filterValue[0].code);
          if (selectedOptionIndex === 0) { return; }
          let repositoryFilterValueIndex = -1;
          filter.options.forEach((option, index) => {
            if (repositoryFilterValue.includes(option.code) && (repositoryFilterValueIndex === -1 || index > repositoryFilterValueIndex)) {
              repositoryFilterValueIndex = index;
            }
          });
          if (selectedOptionIndex === -1 || repositoryFilterValueIndex === -1 || selectedOptionIndex > repositoryFilterValueIndex) {
            match = false;
          }
        } else {
          if (!filterValue.some((fv) => repositoryFilterValue.includes(fv.code))) {
            match = false
          }
        }
      })
      if (match || newContext.showAll) {
        results.push(repository)
      }
    });
    return {
      ...newContext,
      filterValues: filterValues,
      results: results
    }
  }

  const scoreRepositories = (newContext: IFilterContext): IFilterContext => {
    const filterValues = { ...newContext.filterValues }
    const usedFilters = newContext.allFilters.filter(f => Object.keys(filterValues).includes(f.code))
    newContext.results = newContext.results.map((r) => ({
      ...r,
      score: 0
    }))
    // start scoring the repositories
    usedFilters.forEach(filter => {
      const value = filterValues[filter.code]
      const filterValue = Array.isArray(value) ? value : [value]
      if (filter.inputType === FilterType.Hierarchy && filter.options[0]?.code === filterValue[0]?.code) { return; }
      newContext.results.forEach((repository) => {
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
    newContext.results = newContext.results.map((r) => ({
      ...r,
      pctMatch: Math.round((r.score / maxPossibleScore * 100))
    }))
    return newContext
  }

  const _sortRepositories = (newContext: IFilterContext): IFilterContext => {
    const sortFilters = newContext.allFilters.filter(f => f.inputType === FilterType.ScoreBool);
    const genericFilter = sortFilters[0];
    let results = newContext.results.map((repo: IRepository): IRepository => ({
      ...repo,
      score: repo.attributes[genericFilter.code].includes(genericFilter.options[0].code) ? repo.score : 0,
      pctMatch: repo.attributes[genericFilter.code].includes(genericFilter.options[0].code) ? repo.pctMatch : undefined,
    }));
    newContext.results = results;

    // extend all sort functions to iterate all score filters and priorities all the results which value is the first option of the filter

    if (newContext.sortBy === 'Alphabetical (A-Z)') {
      results = newContext.results.sort((a, b) => a.label.localeCompare(b.label));
    }
    else if (newContext.sortBy === 'Alphabetical (Z-A)') {
      results = newContext.results.sort((a, b) => a.label.localeCompare(b.label)).reverse();
    }
    else {
      const dataTypeFilter = newContext.allFilters[0];
      const dataTypeCode = dataTypeFilter?.code;
      const isDataTypeFilterActive = dataTypeCode ? !!newContext.filterValues[dataTypeCode] : false;
      const totalDataTypeOptions = dataTypeFilter?.options.length ?? 0;
      const isGenericRepo = (repo: IRepository): boolean =>
        repo.attributes[genericFilter.code]?.includes(genericFilter.options[1].code) ?? false;
      const getDataTypeCount = (repo: IRepository): number => {
        if (isGenericRepo(repo)) { return Number.MAX_SAFE_INTEGER; }
        const types = dataTypeCode ? repo.attributes[dataTypeCode] : [];
        if (!types || types.length === 0 || (totalDataTypeOptions > 0 && types.length >= totalDataTypeOptions)) {
          return Number.MAX_SAFE_INTEGER - 1;
        }
        return types.length;
      };
      if (isDataTypeFilterActive) {
        results = newContext.results.sort((a, b) => {
          const countDiff = getDataTypeCount(a) - getDataTypeCount(b);
          if (countDiff !== 0) { return countDiff; }
          const scoreDiff = b.score - a.score;
          if (scoreDiff !== 0) { return scoreDiff; }
          return a.label.localeCompare(b.label);
        });
      } else {
        results = newContext.results.sort((a, b) => b.score - a.score || a.label.localeCompare(b.label));
        sortFilters.forEach((filter) => {
          const priorityValue = filter.options[0].code;
          const tempResults = results.sort((a, b) => b.score - a.score || a.attributes[filter.code].includes(priorityValue) ? (b.attributes[filter.code].includes(priorityValue) ? 0 : -1) : (b.attributes[filter.code].includes(priorityValue) ? 1 : 0));
          results = tempResults;
        });
      }
    }

    return {
      ...newContext,
      results: results
    }
  }

  const sortRepositories = (sortValue: string) => {
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
