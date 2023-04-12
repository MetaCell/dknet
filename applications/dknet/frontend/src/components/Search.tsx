import React from "react";
import { useNavigate } from 'react-router-dom';

//components
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

//icons
import ClearIcon from '@mui/icons-material/Clear';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const Search = () => {
  const navigate = useNavigate();

  return (
    <Paper
      component="form"
      sx={{
        p: '8px', display: 'flex', alignItems: 'center', border: '1px solid #EAECF0',
        boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
        borderRadius: '12px',
      }}
    >
      <Autocomplete
        multiple
        limitTags={2}
        options={data}
        size="small"
        fullWidth
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        ChipProps={{ deleteIcon: <ClearIcon fontSize="small" /> }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        )}

        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Data Type"
          />
        )}
      />
      <Divider sx={{ height: 40, mr: 1, ml: 1 }} orientation="vertical" />
      <Autocomplete
        multiple
        limitTags={2}
        options={data}
        size="small"
        fullWidth
        getOptionLabel={(option) => option.title}
        filterSelectedOptions
        ChipProps={{ deleteIcon: <ClearIcon fontSize="small" /> }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.title}
          </li>
        )}

        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Domains"
          />
        )}
      />
      <Divider sx={{ height: 40, mr: 1, ml: 1 }} orientation="vertical" />
      <Button variant="contained">Search</Button>
    </Paper>
  );
};

export default Search;

const data = [
  { title: 'The Shaw', year: 1994 },
  { title: 'The Godfar', year: 1972 },
  { title: 'The rt II', year: 1974 },
  { title: 'The Darkt', year: 2008 },
  { title: '1 Men', year: 1957 },
  { title: "chiner's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Go', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: "One Fle", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
];
