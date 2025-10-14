import React, { useEffect, useState } from "react";

//components
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Chip from '@mui/material/Chip';

//icons
import ClearIcon from '@mui/icons-material/Clear';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const CustomAutoComplete = ({ options, placeholder, onChangeFilterValue, isOptionEqualToValue, defaultValue, noOptionsText }) => {
  const [value, setValue] = useState([])

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  return (
    <Autocomplete
      multiple
      limitTags={2}
      options={options}
      disableClearable
      size="small"
      sx={{
        width: '100%',
      }}
      value={value}
      getOptionLabel={(option: any) => option.label}
      filterSelectedOptions
      onChange={(event, value) => onChangeFilterValue(value)}
      ChipProps={{ deleteIcon: <ClearIcon fontSize="small" /> }}
      isOptionEqualToValue={(option, value) => isOptionEqualToValue(option, value)}
      noOptionsText={<Typography variant="caption">{noOptionsText}</Typography>}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Tooltip arrow key={"tooltip_" + index} title={option.label}>
            <Chip label={option.label} {...getTagProps({ index })} />
          </Tooltip>
        ))
      }
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default CustomAutoComplete;
