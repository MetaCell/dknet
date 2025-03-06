import React from 'react'
import { useFilterContext } from '../context/Context'

//components
import withLayout from "../useLayout";
import Box from '@mui/material/Box';
import MainLayout from "../Layouts/Main";
import Container from "@mui/material/Container";
import RepositoriesList from "./RepositoriesList";
import LaunchPage from "./LaunchPage";
import LinearProgress from '@mui/material/LinearProgress';



const HomePage = () => {
  const { context } = useFilterContext();
  const isFiltersEmpty = Object.values(context.filterValues).every(value => value === undefined);
  const { allRepositories, allFilters, showAll } = context;

  return (
    <Box sx={{ background: isFiltersEmpty? '': '#fff' }}>
      <Container>
        {
          ( allRepositories.length === 0 && allFilters.length === 0 ? <LinearProgress color='secondary' /> : ((isFiltersEmpty && !showAll) ? <LaunchPage /> : <RepositoriesList />))
        }
      </Container>
    </Box>
  )
}
const HomePageWithLayout = withLayout(MainLayout)(HomePage);
export default HomePageWithLayout;
