import React, { useEffect, useState } from "react"
import { useFilterContext } from '../context/Context'

//components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography"
import SwitchWidget from "./widgets/Switch"
import FormGroup from "@mui/material/FormGroup"
import CheckBoxWidget from "./widgets/CheckBox"
import FormLabel from '@mui/material/FormLabel'
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

import { vars } from "../theme/variables";
import RadioGroupWidget from "./widgets/RadioGroup";
import { Description } from "@mui/icons-material"

const {
  grey700,
  grey400
} = vars;

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

  const checkboxFilters = [{
    label: 'None (350)',
  },
  {
    label: "Partial (350)"
  },
  {
    label: "Full (750)"
  }]

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
        <Box>
          <FormLabel
            component="legend"
            sx={{
              color: grey700
            }}
          >
            <Stack direction="row" alignItems='center'>
              <Typography component='h4'>
                Data citation support
              </Typography>
              <Tooltip title="Help">
                <IconButton>
                  <HelpOutlineIcon sx={{
                    color: grey400,
                  }} />
                </IconButton>
              </Tooltip>
            </Stack>
          </FormLabel>
          <FormGroup>
            {
              checkboxFilters.map((row, index) => <CheckBoxWidget key={index} data={row} />)
            }
          </FormGroup>
        </Box>
        <Box>
          <FormLabel
            component="legend"
            sx={{
              color: grey700
            }}
          >
            <Stack direction="row" alignItems='center'>
              <Typography component='h4'>
                Persistent identifier (PID)
              </Typography>
              <Tooltip title="Help">
                <IconButton>
                  <HelpOutlineIcon sx={{
                    color: grey400,
                  }} />
                </IconButton>
              </Tooltip>
            </Stack>
          </FormLabel>
          <RadioGroupWidget />
        </Box>
      </Stack>
    </Box>
  );
};

export default Filters;
