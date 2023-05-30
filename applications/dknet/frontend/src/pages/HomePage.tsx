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
  const isFiltersEmpty = Object.values(context.filterValues).every(value => value === undefined);

  return (
    <Box sx={{ background: isFiltersEmpty? '': '#fff' }}>
      <Container>
        {
          isFiltersEmpty ? <LaunchPage /> : <RepositoriesList />
        }
      </Container>
    </Box>
  )
}
const HomePageWithLayout = withLayout(MainLayout)(HomePage);
export default HomePageWithLayout;
