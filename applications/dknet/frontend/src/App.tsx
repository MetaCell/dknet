import React from 'react';
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from './theme/Theme';

//components
import Box from '@mui/material/Box';
import { CssBaseline } from "@mui/material";
import HomePage from './pages/HomePage';


const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          overflow: {
            xs: "auto",
            
          },
          width: "100vw"

        }}
        height="100vh"
        display="flex"
        overflow="auto" >
          <Box flex={1} display="flex" flexDirection="column" id='main-container'>
            <Routes>
              <Route path="/" element={<HomePage/>} />
            </Routes>
          </Box>
        <Box>
          <Typography variant='body2'>dkNET</Typography>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
