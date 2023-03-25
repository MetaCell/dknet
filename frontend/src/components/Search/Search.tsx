import React from "react";

//components
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import Select, { SelectChangeEvent } from '@mui/material/Select';

//icons

const Search = () => {

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{ p:'8px',display: 'flex', alignItems: 'center',  border: '1px solid #EAECF0',
        boxShadow: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
        borderRadius: '12px' }}
    >
      <FormControl fullWidth sx={{ m: 0 }} size="small">
        <Select
          id="simple-select"
          value={age}
          displayEmpty
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            Data Type
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Divider sx={{ height: 40, mr: 1, ml:1 }} orientation="vertical" />
      <FormControl fullWidth sx={{ m: 0 }} size="small">
        <Select
          id="simple-select"
          value={age}
          displayEmpty
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            Domains
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <Divider sx={{ height: 40, mr: 1, ml:1 }} orientation="vertical" />
      <Button variant="contained" className="search_btn">Search</Button>
    </Paper>
  );
};

export default Search;
