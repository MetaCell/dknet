import React from "react"
import { useFilterContext } from "../context/Context"

//components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography"
import FormGroup from "@mui/material/FormGroup"
import CheckBoxWidget from "./widgets/CheckBox"
import FormLabel from '@mui/material/FormLabel'
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

import { vars } from "../theme/variables";
import { Button } from "@mui/material"

const {
  grey700,
  grey400
} = vars;
const CustomCheckboxesGroup = ({ data }) => {
  const { context, setContext } = useFilterContext()

  const onClearFilter = () => {
    setContext({
      ...context,
      showAll: true,
      filterValues: {
        ...context.filterValues,
        [data.code]: undefined
      }
    })
  }

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
            <Tooltip title={data.description}>
              <IconButton sx={{ height: 'fit-content', p: 0 }}>
                <HelpOutlineIcon sx={{
                  color: grey400,
                }} />
              </IconButton>
            </Tooltip>
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
          data.options.map((row, index) =>
            <CheckBoxWidget
              key={"checkbox_" + index}
              data={row}
              filter={data}
            />)
        }
      </FormGroup>
    </Box >
  );
};

export default CustomCheckboxesGroup;
