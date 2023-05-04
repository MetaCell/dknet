import React, { useEffect, useState } from "react";

//components
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

//icons
import ClearIcon from '@mui/icons-material/Clear';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const CustomAutoComplete = ({ options, placeholder, onChangeFilterValue, defaultValue }) => {
  const [value, setValue] = useState([])

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])
  
  return (
    <Autocomplete
      multiple
      limitTags={2}
      options={options}
      size="small"
      fullWidth
      value={value}
      getOptionLabel={(option: any) => option.label}
      filterSelectedOptions
      onChange={(event, value) => onChangeFilterValue(value)}
      ChipProps={{ deleteIcon: <ClearIcon fontSize="small" /> }}
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
