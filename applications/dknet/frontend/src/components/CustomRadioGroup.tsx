import React  from "react"

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
import { useFilterContext, useFilterUpdateContext } from "../context/Context";

const {
  grey700,
  grey400
} = vars;

const CustomRadioGroup = ({ data }) => {
  const { context, setContext } = useFilterContext()
  const updateFilter = useFilterUpdateContext()
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
    <Box>
      <FormLabel
        component="legend"
        sx={{
          color: grey700
        }}
      >
        <Stack direction="row" alignItems='center'>
          <Typography component='h4'>
            {data.label}
          </Typography>
          <Tooltip title={data.description}>
            <IconButton>
              <HelpOutlineIcon sx={{
                color: grey400,
              }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </FormLabel>
      <FormControl>
        <RadioGroup
          onChange={onRadioChange}
          defaultValue={context?.filterValues[data.code]?.code}
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
