import React, { useCallback } from "react"
import { useFilterContext } from "../context/Context"

//components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography"
import FormGroup from "@mui/material/FormGroup"
import CheckBoxWidget from "./widgets/CheckBox"
import FormLabel from '@mui/material/FormLabel'
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

import { vars } from "../theme/variables";
import { Button } from "@mui/material"
import { useResponsive } from "../hooks/useResponsive"
import HelpTooltip from "./HelpTooltip"

const {
  grey700
} = vars;

const CustomCheckboxesGroup = ({ data }) => {
  const { context, setContext } = useFilterContext()
  const { isTablet, isTooSmall } = useResponsive();

  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleTooltipOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

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
  }, [context, data.code, setContext]);

  console.log(data.options);


  return (
    <Box display='flex' flexDirection='column' gap={1}>
      <FormLabel
        component="legend"
        sx={{
          color: grey700
        }}
      >
        <Stack direction="row" alignItems='flex-start' justifyContent="space-between">
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
              }}
            >
              Reset filter
            </Button>
          </Stack>
        </Stack>
      </FormLabel>
      <FormGroup>
        {
          data.options.map((row) =>
            <CheckBoxWidget
              key={"checkbox_" + row.code}
              data={row}
              filter={data}
            />)
        }
      </FormGroup>
    </Box >
  );
};

export default CustomCheckboxesGroup;
