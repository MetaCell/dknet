import React from 'react'
import { useFilterContext } from '../context/Context'

//components
import MainLayout from "../Layouts/Main";
import Container from "@mui/material/Container";
import RepositoriesList from "./RepositoriesList";
import LaunchPage from "./LaunchPage";
import Box from '@mui/material/Box/Box';
import { CircularProgress } from '@mui/material';
import { isFiltersEmpty } from '../utils/helpers';



const HomePage = () => {
  const { context } = useFilterContext();
  const isFilterValuesEmpty = isFiltersEmpty(context.filterValues);
  const { allRepositories, allFilters, showAll } = context;

  return (
    <MainLayout>
      <Container>
        {
          (allRepositories.length === 0 && allFilters.length === 0 ? <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}>
            <CircularProgress color='secondary' />
          </Box> : ((isFilterValuesEmpty && !showAll) ? <LaunchPage /> : <RepositoriesList />))
        }
      </Container>
    </MainLayout>
  )
}

export default HomePage;
