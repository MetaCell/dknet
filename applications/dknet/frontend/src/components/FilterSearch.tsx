import React, { useCallback } from "react";

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
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import { useFilterContext } from "../context/Context";
import CustomAutoComplete from "./widgets/CustomAutoComplete";
import { vars } from "../theme/variables";
import { Button } from "@mui/material";

const {
  grey700,
  grey400
} = vars;

//icons

const FilterSearch = () => {
  const { context, setContext } = useFilterContext();

  const onChangeFilterValue = useCallback((value, filter) => {
    setContext({
      ...context,
      filterValues: {
        ...context.filterValues,
        [filter.code]: value
      }
    })
  }, [context, setContext]);

  const handleResetFilter = useCallback((filterIndex: number) => {
    const newFilterValues = {
      ...context.filterValues,
      [context.allFilters[filterIndex].code]: undefined
    };

    setContext({
      ...context,
      currentView: 'repositories',
      filterValues: newFilterValues
    })
  }, [context, setContext]);

  const handleResetDomain = useCallback(() => handleResetFilter(1), [handleResetFilter]);
  const handleResetType = useCallback(() => handleResetFilter(0), [handleResetFilter]);

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
            <Typography variant="h4" flex={1}>
              Data Type
            </Typography>
            <Stack direction="row" flex={1} flexShrink={0} gap={1} justifyContent="flex-end">
              <Tooltip title={"Data Type"}>
                <IconButton sx={{ height: 'fit-content', p: 0 }}>
                  <HelpOutlineIcon sx={{
                    color: grey400,
                  }} />
                </IconButton>
              </Tooltip>
              <Button sx={{
                height: 'fit-content',
                minHeight: 0,
                p: 0,
              }}
                disabled={!context.filterValues?.[context.allFilters[0].code]}
                variant='text'
                onClick={handleResetType}
                startIcon={<FilterListOffIcon />}
              >Reset filter</Button>
            </Stack>
          </Stack>
        </FormLabel>
        <FormGroup>
          <Paper
            component="form"
            sx={{
              p: '8px', display: 'flex', alignItems: 'center', border: '1px solid #EAECF0',
              borderRadius: '12px',
              boxShadow: 'none',
              maxWidth: '100%',
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
            color: grey700,
          }}
        >
          <Stack direction="row" alignItems='center' justifyContent="space-between">
            <Typography variant="h4" flex={1}>
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
              <Button
                variant='text'
                disabled={!context.filterValues?.[context.allFilters[1].code]}
                onClick={handleResetDomain}
                startIcon={<FilterListOffIcon />}
              >Reset filter</Button>
            </Stack>
          </Stack>
        </FormLabel>
        <FormGroup>
          <Paper
            component="form"
            sx={{
              p: '8px', display: 'flex', alignItems: 'center', border: '1px solid #EAECF0',
              borderRadius: '12px',
              boxShadow: 'none',
              maxWidth: '100%',
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
