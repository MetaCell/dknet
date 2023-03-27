import React from 'react';

//components
import { Box } from '@mui/material';
import Grid from "@mui/material/Grid";
import withLayout from "../useLayout";
import MainLayout from "../components/Layouts/Main";
import Container from '@mui/material/Container';
import Filters from "../components/Filters";

const RepositoriesPage = () => {
  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          xs=8
        </Grid>
        <Grid item xs={5}>
          <Filters />
        </Grid>
      </Grid>
    </Container>

  )
}
const RepositoriesPageWithLayout = withLayout(MainLayout)(RepositoriesPage);
export default RepositoriesPageWithLayout;
