import React, { useEffect, useState } from 'react'
import { useFilterContext } from '../context/Context'

//components
import withLayout from "../useLayout"

<<<<<<< HEAD
import MainLayout from "../Layouts/Main";
import Grid from "@mui/material/Grid";
import Filters from "../components/Filters";
import Container from "@mui/material/Container";
import SortWidget from '../components/widgets/Sort';
import RepositoryCard from '../components/RepositoryCard';
import QuestionBox from '../components/QuestionBox/QuestionBox';
=======
import MainLayout from "../Layouts/Main"
import Grid from "@mui/material/Grid"
import Filters from "../components/Filters"
import Container from "@mui/material/Container"
import SortWidget from '../components/widgets/Sort'
import RepositoryCard from '../components/RepositoryCard'
>>>>>>> 0e716a27320e3172dbc80c2afdb5cdba7be01823


const HomePage = () => {
  const { context, setContext } = useFilterContext();
  const [ repositories, setRepositories ] = useState([])

  useEffect(() => {
    // apply context.filterValues on the allFilters + allRepositories
    const foundRepositories = context.allRepositories // .filter((repository) => {})
    setRepositories(foundRepositories)
  }, [context])

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <SortWidget/>
          {repositories && repositories.map((repository) => {
            return (
              <RepositoryCard key={repository.code} repository={repository} />
            )
          })
          }
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
