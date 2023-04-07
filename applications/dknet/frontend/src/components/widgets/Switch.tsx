import React from "react"
import { useFilterContext } from '../../context/Context'

//components
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CustomFormControlLabel from "./CustomFormControlLabel";

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#088E75' : '#0BA47D',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const SwitchWidget = ({ data }: any) => {
  const { context, setContext } = useFilterContext()
  const filter = context.allFilters.filter((filter: any) => filter.code === data.code)[0]

  const onSwitchChange = (e: any) => {
    let newValue = null
    if(e.target.checked) {
      newValue = filter.options[0]
    } else {
      newValue = filter.options[1]
    }
    setContext({
      ...context,
      filterValues: {
        ...context.filterValues,
        [data.code]: newValue
      }
    })
  }

  return (
    <CustomFormControlLabel
      control={<IOSSwitch
        onChange={onSwitchChange}
        sx={{ m: 1 }}
        checked={context?.filterValues[data.code]?.code === filter.options[0].code}/>}
      label={<Stack direction="row" alignItems='center'>
        <Typography>
          {data.label}
        </Typography>
        <Tooltip title={data.description}>
          <IconButton>
            <HelpOutlineIcon sx={{
              color: '#98A2B3',
            }}/>
          </IconButton>
        </Tooltip>
      </Stack>}
      value={undefined}
    />
  );
};

export default SwitchWidget;
