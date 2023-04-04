import React from 'react';

//components
import withLayout from "../useLayout";

import MainLayout from "../Layouts/Main";
import Grid from "@mui/material/Grid";
import Filters from "../components/Filters";
import Container from "@mui/material/Container";
import SortWidget from '../components/widgets/Sort';
import RepositoryCard from '../components/RepositoryCard';
import QuestionBox from '../components/QuestionBox/QuestionBox';


const HomePage = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <SortWidget/>
          <RepositoryCard/>
          <QuestionBox/>
        </Grid>
        <Grid item xs={5}>
          <Filters />
        </Grid>
      </Grid>
    </Container>
  )
}
const HomePageWithLayout = withLayout(MainLayout)(HomePage);
export default HomePageWithLayout;
