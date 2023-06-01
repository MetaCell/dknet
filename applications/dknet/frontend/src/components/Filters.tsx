import React from "react"
import { useFilterContext } from '../context/Context'

//components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography"
import SwitchWidget from "./widgets/Switch"
import FormGroup from "@mui/material/FormGroup"
import CustomRadioGroup from "./CustomRadioGroup";
import CustomCheckboxesGroup from "./CustomCheckboxesGroup";
import { Button } from "@mui/material"
import { resetFilters } from "../utils/helpers";


const Filters = () => {
  const { context, setContext, scoreRepositories } = useFilterContext()

  const filters = context.allFilters.slice(2)

  const switchFilters = filters
    .filter((filter) => filter.inputType === 'BOOLEAN' && filter.label !== undefined)

  const radioFilters = filters
    .filter((filter) => filter.inputType === "SINGLE" && filter.label !== undefined)

  const checkboxFilters = filters
    .filter((filter) => filter.inputType === "MULTI" && filter.label !== undefined)

  const onClearFilters = () => {
    setContext({
      ...context,
      filterValues: resetFilters()
    })
  }

  return (
    <Box sx={{
      background: '#FCFCFD',
      borderRadius: '12px',
      padding: 3
    }}>
      <Stack spacing={2}>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='h5' lineHeight='unset'>Filter Results</Typography>
          <Button variant='text' sx={{ fontWeight: 600, color: '#088E75', minHeight: 'unset'  }} onClick={onClearFilters}>Clear Filters</Button>
        </Box>
        <Box>
          <FormGroup>
            {
              switchFilters.map((row, index) => <SwitchWidget key={index} data={row} />)
            }
          </FormGroup>
        </Box>
        {
          checkboxFilters?.map((row, index) => <CustomCheckboxesGroup data={row} key={index} />)
        }

        {
          radioFilters?.map((row, index) => <CustomRadioGroup data={row} key={index} />)
        }

      </Stack>
    </Box>
  );
};

export default Filters;
