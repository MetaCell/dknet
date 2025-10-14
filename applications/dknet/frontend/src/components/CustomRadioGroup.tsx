import React, { useCallback } from "react"

//components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography"
import FormLabel from '@mui/material/FormLabel'

import { vars } from "../theme/variables";
import RadioGroupWidget from "./widgets/RadioWidget";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { useFilterContext } from "../context/Context";
import Button from "@mui/material/Button/Button"
import FilterListOffIcon from '@mui/icons-material/FilterListOff';
import HelpTooltip from "./HelpTooltip";
import { useResponsive } from "../hooks/useResponsive";


const {
  grey700
} = vars;

const CustomRadioGroup = ({ data }) => {
  const { context, setContext } = useFilterContext()
  const filter = context.allFilters.find((filter: any) => filter.code === data.code)
  const { isTablet, isTooSmall } = useResponsive();
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleTooltipOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const onRadioChange = useCallback((e: any) => {
    const newValue = filter.options.find(row => row.code === e.target.value)
    setContext({
      ...context,
      filterValues: {
        ...context.filterValues,
        [data.code]: newValue
      }
    })
  }, [filter.options, context, setContext, data.code]);

  const onClearFilter = useCallback(() => {
    const newFilterValues = {
      ...context.filterValues,
      [data.code]: undefined
    };

    setContext({
      ...context,
      currentView: 'repositories',
      filterValues: newFilterValues
    })
  }, [context, setContext, data.code]);

  return (
    <Box display='flex' flexDirection='column' gap={1}>
      <FormLabel
        component="legend"
        sx={{
          color: grey700
        }}
      >
        <Stack direction="row" alignItems='center' justifyContent="space-between">
          <Typography variant='h4' flex={1}>
            {data.label}
          </Typography>
          <Stack direction="row" flex={1} flexShrink={0} gap={1} justifyContent="flex-end">
            <HelpTooltip
              description={data.description}
              isTablet={isTablet}
              isTooSmall={isTooSmall}
              open={open}
              handleTooltipOpen={handleTooltipOpen}
              handleTooltipClose={handleTooltipClose}
            />
            <Button
              variant='text'
              onClick={onClearFilter}
              startIcon={<FilterListOffIcon />}
              disabled={!context.filterValues?.[data.code]}
              sx={{
                height: 'fit-content',
                minHeight: 0,
                p: 0,
              }}>Reset filter</Button>
          </Stack>
        </Stack>
      </FormLabel>
      <FormControl>
        <RadioGroup
          onChange={onRadioChange}
          value={context?.filterValues[data.code]?.code || ''}
          aria-labelledby="demo-customized-radios"
          name="customized-radios"
        >
          {data.options.map((option, index) => <RadioGroupWidget key={"customRadioGroup_" + index} data={option} />)}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default CustomRadioGroup;
