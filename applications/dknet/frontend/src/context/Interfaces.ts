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
  color: string
}

export interface IFilter {
  code: string,
  label: string,
  inputType: FilterType,
  options: IFilterOptions[]
}

export interface IFilterContext {
  pageNumber: number,
  rowsPerPage: number,
  sortBy: string,
  filterValues: {
    [key: string]: IFilterOptions | IFilterOptions[]
  },
  allFilters: IFilter[],
  allRepositories: IRepository[]
}
