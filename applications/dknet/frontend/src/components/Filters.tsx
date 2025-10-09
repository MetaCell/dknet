import React, { useCallback } from "react"
import { useFilterContext } from '../context/Context'

//components
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography"
import CustomRadioGroup from "./CustomRadioGroup";
import CustomCheckboxesGroup from "./CustomCheckboxesGroup";
import { Button, Stack } from "@mui/material"
import { resetFilters, hasActiveFilters } from "../utils/helpers";
import NestedListView from "./NestedListView"
import FilterSearch from "./FilterSearch";
import { vars } from "../theme/variables";
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

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

  const onClearFilters = useCallback(() => {
    setContext({
      ...context,
      showAll: true,
      filterValues: resetFilters(context.filters)
    })
  }, [context, setContext]);

  const hasFiltersApplied = hasActiveFilters(context.filterValues)

  return (
    <Stack spacing={3} sx={{
      background: vars.grey25,
      borderRadius: '0.75rem',
      padding: '1.25rem 1.5rem',
    }}>
      <Box display='flex' justifyContent='space-between' alignItems='center' gap={2}>
        <Typography variant='h2'>Filters</Typography>
        <Button
          variant='outlined'
          onClick={onClearFilters}
          startIcon={<FilterListOffIcon />}
          disabled={!hasFiltersApplied}
        >
          Reset all filters
        </Button>
      </Box>
      <Stack spacing={3}>
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
      </Stack>
    </Stack >
  );
};

export default Filters;
