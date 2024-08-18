import React from "react"

//components
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from "@mui/material/Typography"
import FormLabel from '@mui/material/FormLabel'
import Tooltip from "@mui/material/Tooltip"
import IconButton from "@mui/material/IconButton"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"

import { vars } from "../theme/variables";
import RadioGroupWidget from "./widgets/RadioWidget";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { useFilterContext } from "../context/Context";
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';


const {
  grey700,
  grey400
} = vars;

const CustomRadioGroup = ({ data }) => {
  const { context, setContext } = useFilterContext()
  const filter = context.allFilters.find((filter: any) => filter.code === data.code)
  const onRadioChange = (e: any) => {
    const newValue = filter.options.find(row => row.code === e.target.value)
    setContext({
      ...context,
      filterValues: {
        ...context.filterValues,
        [data.code]: newValue
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
        <Stack direction="row" alignItems='center' justifyContent="space-between">
          <Typography component='h4'>
            {data.label}
          </Typography>
          <Stack direction="row">
            <IconButton sx={{ p: '2px' }}>
              <CleaningServicesOutlinedIcon sx={{
                color: '#98A2B3'
              }} />
            </IconButton>
            <Tooltip title={data.description}>
              <IconButton sx={{ p: '2px' }}>
                <HelpOutlineIcon sx={{
                  color: grey400,
                }} />
              </IconButton>
            </Tooltip>
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
          {data.options.map((option, index) => <RadioGroupWidget key={index} data={option} />)}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default CustomRadioGroup;
