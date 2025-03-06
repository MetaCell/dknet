import React from "react"
import { useFilterContext } from '../context/Context'

//components
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography"
import CustomRadioGroup from "./CustomRadioGroup";
import CustomCheckboxesGroup from "./CustomCheckboxesGroup";
import { Button } from "@mui/material"
import { resetFilters } from "../utils/helpers";
import NestedListView from "./NestedListView"
import FilterSearch from "./FilterSearch";

const Filters = () => {
  const { context, setContext } = useFilterContext()

  const filters = context.allFilters.slice(2)

  // const switchFilters = filters
  //   .filter((filter) => filter.inputType === 'BOOLEAN' && filter.label !== undefined)

  const radioFilters = filters
    .filter((filter) => filter.inputType === "BOOLEAN" && filter.label !== undefined)

  const checkboxFilters = filters
    .filter((filter) => filter.inputType === "MULTI" && filter.label !== undefined)

  const hierarchicalFilters = filters
    .filter((filter) => filter.inputType === "HIERARCHY" && filter.label !== undefined)

  const onClearFilters = () => {
    setContext({
      ...context,
      showAll: false,
      filterValues: resetFilters(context.filters)
    })
  }

  return (
    <Box sx={{
      background: '#FCFCFD',
      borderRadius: '12px',
      padding: 3
    }}>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h5' lineHeight='unset'>Filter Results</Typography>
        <Button variant='text' sx={{ fontWeight: 600, color: '#088E75', minHeight: 'unset' }} onClick={onClearFilters}>Clear Filters</Button>
      </Box>
      <Box display='flex' flexDirection='column' gap={3} mt={1}>
        <FilterSearch />
        {/* <FormGroup>
          {
            switchFilters.map((row, index) => <SwitchWidget key={index} data={row} />)
          }
        </FormGroup> */}
        {
          checkboxFilters?.map((row, index) => <CustomCheckboxesGroup data={row} key={index} />)
        }

        {
          hierarchicalFilters?.map((row, index) => <NestedListView data={row} key={index} />)
        }

        {
          radioFilters?.map((row, index) => <CustomRadioGroup data={row} key={index} />)
        }
      </Box>
    </Box>
  );
};

export default Filters;
