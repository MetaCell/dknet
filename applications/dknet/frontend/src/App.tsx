import React from 'react'
import { ThemeProvider } from "@mui/material/styles"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import theme from './theme/Theme'
import { FilterProvider } from './context/Context'

//components
import Box from '@mui/material/Box'
import { CssBaseline } from "@mui/material"
import HomePage from './pages/HomePage'
import ScrollToTop from './components/ScrollTop'

const App = () => {

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <FilterProvider>
          <CssBaseline />
          <Box sx={{
            overflow: {
              xs: "auto",
            },
          }}
          height="100vh"
          display="flex"
          overflow="auto"
          >
            <Box flex={1} display="flex" flexDirection="column" id='main-container'>
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </Box>
          </Box>
          <ScrollToTop/>
        </FilterProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
