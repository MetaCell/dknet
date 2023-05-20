import React, { useEffect, useState } from 'react'
import { useFilterContext } from '../context/Context'

//components
import withLayout from "../useLayout";
import Box from '@mui/material/Box';
import MainLayout from "../Layouts/Main";
import Grid from "@mui/material/Grid";
import Filters from "../components/Filters";
import Container from "@mui/material/Container";
import SortWidget from '../components/widgets/Sort';
import RepositoryCard from '../components/RepositoryCard';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import RepositoriesList from "./RepositoriesList";
import LaunchPage from "./LaunchPage";


const HomePage = () => {
  const { context, setContext } = useFilterContext();
  const [ repositories, setRepositories ] = useState([])
  const isFiltersEmpty = Object.values(context.filterValues).every(value => value === undefined);



  useEffect(() => {
    const newFilterValues = {}
    const filterValuesClone = Object.assign({}, context.filterValues)
    Object.keys(filterValuesClone).filter(key => filterValuesClone[key] !== undefined).forEach(key => {
      if(!Array.isArray(filterValuesClone[key])) {
        filterValuesClone[key] = [filterValuesClone[key]]
      }
      newFilterValues[key] = []
      filterValuesClone[key].forEach(valueObj => {
        newFilterValues[key].push(valueObj.code)
      })
    })
    const match = []
    for (const repository of context.allRepositories) {
      for(const key of Object.keys(newFilterValues)){
        if (repository.attributes[key].some(val => newFilterValues[key].includes(val))) {
          match.push(repository)
          break
        }
      }
    }

    setRepositories(match)
  }, [context])

  return (
    <Container>
      {
        isFiltersEmpty ? <LaunchPage /> : <RepositoriesList />
      }
    </Container>
  )
}
const HomePageWithLayout = withLayout(MainLayout)(HomePage);
export default HomePageWithLayout;
