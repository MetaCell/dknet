import React from "react";

//components
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from '@mui/material/FormLabel'
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';

import { useFilterContext } from "../context/Context";
import CustomAutoComplete from "./widgets/CustomAutoComplete";
import { vars } from "../theme/variables";

const {
  grey700,
  grey400
} = vars;

//icons

const FilterSearch = () => {
  const { context, setContext } = useFilterContext();

  const onChangeFilterValue = (value, filter) => {
    setContext({
      ...context,
      showAll: false,
      filterValues: {
        ...context.filterValues,
        [filter.code]: value
      }
    })
  }

  return (
    <>
      <Box display='flex' flexDirection='column' gap={1}>
        <FormLabel
          component="legend"
          sx={{
            color: grey700
          }}
        >
          <Stack direction="row" alignItems='center' justifyContent="space-between">
            <Typography component='h4'>
                Data Type
            </Typography>
            <Stack direction="row">
              <Tooltip title={"Data Type"}>
                <IconButton sx={{ p: '2px' }}>
                  <HelpOutlineIcon sx={{
                    color: grey400,
                  }} />
                </IconButton>
              </Tooltip>
              <IconButton sx={{ p: '2px' }} onClick={() => {
                setContext({
                  ...context,
                  showAll: false,
                  filterValues: {
                    ...context.filterValues,
                    [context.allFilters[0].code]: undefined
                  }
                })
              }}>
                <CleaningServicesOutlinedIcon sx={{
                  color: '#98A2B3'
                }} />
              </IconButton>
            </Stack>
          </Stack>
        </FormLabel>
        <FormGroup>
          <Paper
            component="form"
            sx={{
              p: '8px', display: 'flex', alignItems: 'center', border: '1px solid #EAECF0',
              borderRadius: '12px',
              minWidth: '150px'
            }}
          >
            <CustomAutoComplete
              options={context.allFilters.length > 0 ? context.allFilters[0].options : []}
              onChangeFilterValue={(value) => onChangeFilterValue(value, context.allFilters[0])}
              isOptionEqualToValue={(option, value) => option.code === value.code}
              defaultValue={context.allFilters.length > 0 ? (context.filterValues[context.allFilters[0].code] || []) : []}
              placeholder={context.allFilters.length > 0 ? context.allFilters[0].label : ''}
              noOptionsText={"No match"}
            />
          </Paper>
        </FormGroup>
      </Box>

      <Box display='flex' flexDirection='column' gap={1}>
        <FormLabel
          component="legend"
          sx={{
            color: grey700
          }}
        >
          <Stack direction="row" alignItems='center' justifyContent="space-between">
            <Typography component='h4'>
                Domain
            </Typography>
            <Stack direction="row">
              <Tooltip title={"Domain"}>
                <IconButton sx={{ p: '2px' }}>
                  <HelpOutlineIcon sx={{
                    color: grey400,
                  }} />
                </IconButton>
              </Tooltip>
              <IconButton sx={{ p: '2px' }} onClick={() => {
                setContext({
                  ...context,
                  showAll: false,
                  filterValues: {
                    ...context.filterValues,
                    [context.allFilters[1].code]: undefined
                  }
                })
              }}>
                <CleaningServicesOutlinedIcon sx={{
                  color: '#98A2B3'
                }} />
              </IconButton>
            </Stack>
          </Stack>
        </FormLabel>
        <FormGroup>
          <Paper
            component="form"
            sx={{
              p: '8px', display: 'flex', alignItems: 'center', border: '1px solid #EAECF0',
              borderRadius: '12px',
              minWidth: '150px'
            }}
          >
            <CustomAutoComplete
              options={context.allFilters.length > 0 ? context.allFilters[1].options : []}
              onChangeFilterValue={(value) => onChangeFilterValue(value, context.allFilters[1])}
              isOptionEqualToValue={(option, value) => option.code === value.code}
              defaultValue={context.allFilters.length > 0 ? (context.filterValues[context.allFilters[1].code] || []) : []}
              placeholder={context.allFilters.length > 0 ? context.allFilters[1].label : ''}
              noOptionsText={"No match"}
            />
          </Paper>
        </FormGroup>
      </Box>
    </>
  );
};

export default FilterSearch;
