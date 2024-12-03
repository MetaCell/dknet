import { FilterType, FilterOptionColor } from '../config/enums'

export interface IRepositoryAttributes {
  [key: string]: string[]
}

export interface IRepository {
  code: string,
  label: string,
  url: string,
  attributes: IRepositoryAttributes,
  score?: number,
  pctMatch?: number
}

export interface IFilterOptions {
  code: string,
  label: string,
  icon: string,
  color: string,
  weighting?: number
}

export interface IFilter {
  code: string,
  label: string,
  inputType: FilterType,
  options: IFilterOptions[],
  weighting?: number
}

export interface IFilterContext {
  pageNumber: number,
  rowsPerPage: number,
  sortBy: string,
  filterValues: {
    [key: string]: IFilterOptions | IFilterOptions[]
  },
  allFilters: IFilter[],
  allRepositories: IRepository[],
  allGeneralistRepositories: IRepository[],
  results: IRepository[],
  filters: any[],
}
