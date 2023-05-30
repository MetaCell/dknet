import React, { useEffect } from "react";

//components
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

//icons
import { useFilterContext } from "../context/Context";
import CustomAutoComplete from "./widgets/CustomAutoComplete";

const Search = () => {
  const { context, setContext } = useFilterContext();

  const onChangeFilterValue = (value, filter) => {
    setContext({
      ...context,
      filterValues: {
        ...context.filterValues,
        [filter.code]: value
      }
    })
  }

  return (
    <Paper
      component="form"
      sx={{
        p: '8px', display: 'flex', alignItems: 'center', border: '1px solid #EAECF0',
        boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
        borderRadius: '12px',
        minWidth: '640px'
      }}
    >
      <CustomAutoComplete
        options={context.allFilters[0].options}
        onChangeFilterValue={(value) => onChangeFilterValue(value, context.allFilters[0])}
        isOptionEqualToValue={(option, value) => option.code === value.code}
        defaultValue={context.filterValues[context.allFilters[0].code] || []}
        placeholder={context.allFilters[0].label}
        noOptionsText={"No match"}
      />
      <Divider sx={{ height: 40, mr: 1, ml: 1 }} orientation="vertical" />
      <CustomAutoComplete
        options={context.allFilters[1].options}
        onChangeFilterValue={(value) => onChangeFilterValue(value, context.allFilters[1])}
        isOptionEqualToValue={(option, value) => option.code === value.code}
        defaultValue={context.filterValues[context.allFilters[1].code] || []}
        placeholder={context.allFilters[1].label}
        noOptionsText={"No match"}
      />

      <Divider sx={{ height: 40, mr: 1, ml: 1 }} orientation="vertical" />
      <Button variant="contained">Search</Button>
    </Paper>
  );
};

export default Search;
