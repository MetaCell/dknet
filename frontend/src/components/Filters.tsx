import React from "react";

//components
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import SwitchWidget from "./widgets/Switch";
import FormGroup from "@mui/material/FormGroup";

const Filters = () => {

  const switchFilters = [{
    label: 'Human data compliant (HIPAA-Compliant)',
  },
  {
    label: "Data updates support"
  },
  {
    label: "Published Academic Work support"
  }]

  return (
    <Box sx={{
      background: '#FCFCFD',
      borderRadius: '12px',
      padding: 3
    }}>
      <Stack spacing={2}>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='h5'>Filter Results</Typography>
          <Typography variant='subtitle2'>Clear Filters</Typography>
        </Box>
        <Box>
          <FormGroup>
            {
              switchFilters.map((row, index) => <SwitchWidget key={index} data={row} />)
            }
          </FormGroup>
        </Box>
        <Box>Item 3</Box>
      </Stack>
    </Box>
  );
};

export default Filters;
