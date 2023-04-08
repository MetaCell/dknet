import React, { useEffect, useState } from "react"
import { useFilterContext } from '../context/Context'

//components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography"
import SwitchWidget from "./widgets/Switch"
import FormGroup from "@mui/material/FormGroup"
import CustomRadioGroup from "./CustomRadioGroup";
import CustomCheckboxesGroup from "./CustomCheckboxesGroup";


const Filters = () => {
  const { context, setContext } = useFilterContext()
  const [ filters, setFilters ] = useState<any>([])

  useEffect(() => {
    // TODO: apply context.filterValues on the allFilters and create the filters
    const filters = context.allFilters //
    setFilters(filters)
  }, [context])

  const switchFilters = filters
    .filter((filter) => filter.inputType === 'BOOLEAN' && filter.label !== undefined)


  const radioFilters = filters
    .filter((filter) => filter.inputType === "SINGLE" && filter.label !== undefined)


  const checkboxFilters = filters
    .filter((filter) => filter.inputType === "MULTI" && filter.label !== undefined)

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
