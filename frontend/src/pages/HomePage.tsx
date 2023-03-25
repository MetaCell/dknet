import React from 'react';

import withLayout from "../useLayout";

import MainLayout from "../components/Layouts/Main";
const HomePage = () => {
  return (
    <div>
    </div>
  )
}
const HomePageWithLayout = withLayout(MainLayout)(HomePage);
export default HomePageWithLayout;
