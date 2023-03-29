import React from 'react';

//components
import { Box, Typography } from '@mui/material';
import Header from '../components/Header/Header';
import Search from '../components/Search/Search';
import withLayout from "../useLayout";

import MainLayout from "../components/Layouts/Main";


const HomePage = () => {
  return (
    <div></div>
  )
}
const HomePageWithLayout = withLayout(MainLayout)(HomePage);
export default HomePageWithLayout;
