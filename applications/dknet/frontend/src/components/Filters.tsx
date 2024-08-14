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
import CustomTreeView from "./CustomTreeView";
import NestedListView from "./NestedListView"

const DUMMY_TREE_DATA = [
  {
    itemId: "grid",
    label: "Data Grid",
  },
  {
    itemId: "pickers",
    label: "Date and Time Pickers",
  },
  {
    itemId: "charts",
    label: "Charts",
  },
  {
    itemId: "tree-view",
    label: "Tree View",
  },
];


const Filters = () => {
  const { context, setContext } = useFilterContext()

  const filters = context.allFilters.slice(2)

  const switchFilters = filters
    .filter((filter) => filter.inputType === 'BOOLEAN' && filter.label !== undefined)

  const radioFilters = filters
    .filter((filter) => filter.inputType === "BOOLEAN" && filter.label !== undefined)

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
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h5' lineHeight='unset'>Filter Results</Typography>
        <Button variant='text' sx={{ fontWeight: 600, color: '#088E75', minHeight: 'unset' }} onClick={onClearFilters}>Clear Filters</Button>
      </Box>
      <Box display='flex' flexDirection='column' gap={3} mt={1}>
        <FormGroup>
          {
            switchFilters.map((row, index) => <SwitchWidget key={index} data={row} />)
          }
        </FormGroup>

        <NestedListView data={{
          label: 'Data Citation Important to you?',
          description: 'Data Citation Important to you?'
        }} listData={DUMMY_TREE_DATA} />

        <CustomTreeView data={{
          label: 'Data Citation Important to you?',
          description: 'Data Citation Important to you?'
        }} treeData={DUMMY_TREE_DATA} />

        {
          checkboxFilters?.map((row, index) => <CustomCheckboxesGroup data={row} key={index} />)
        }

        {
          radioFilters?.map((row, index) => <CustomRadioGroup data={row} key={index} />)
        }
      </Box>
    </Box>
  );
};

export default Filters;
