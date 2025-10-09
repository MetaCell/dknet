import React from 'react'
import { useFilterContext } from '../context/Context'

//components
import MainLayout from "../Layouts/Main";
import Container from "@mui/material/Container";
import RepositoriesList from "./RepositoriesList";
import LaunchPage from "./LaunchPage";
import Box from '@mui/material/Box/Box';
import { CircularProgress } from '@mui/material';



const HomePage = () => {
  const { context } = useFilterContext();
  const isFiltersEmpty = Object.values(context.filterValues).every(value => value === undefined);
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
          </Box> : ((isFiltersEmpty && !showAll) ? <LaunchPage /> : <RepositoriesList />))
        }
      </Container>
    </MainLayout>
  )
}

export default HomePage;
