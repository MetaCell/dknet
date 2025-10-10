import React from "react";
import { useFilterContext } from "../../context/Context";

//components
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

//icons
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const labels = [
  'Highest Score',
  'Alphabetical (A-Z)',
  'Alphabetical (Z-A)'
];

const SortWidget = () => {
  const { context, setContext } = useFilterContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = React.useState('Highest Score');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    setContext({
      ...context,
      currentView: 'repositories',
      sortBy: event.target.value
    })
  };
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (context.results.length === 0) {
    return <></>;
  }
  return (
    <>
      <Button
        variant="outlined"
        aria-controls={open ? 'sortMenu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        startIcon={<FilterListIcon />}
        endIcon={<ArrowDropDownIcon />}
        onClick={handleClick}
      >
        Sort By
      </Button>
      <Menu
        id="sortMenu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: '12px',
          }
        }}
      >
        {labels.map((label) => (
          <MenuItem
            key={label}
            value={label}
            sx={{
              padding: '9px 10px',
              '& .MuiTypography-root': {
                fontWeight: 500,
                fontSize: '0.875rem',
              },
              '& .MuiSvgIcon-root': {
                width: '1rem',
                height: '1rem'
              },
              '& .MuiRadio-root': {
                padding: 0,
                marginRight: '0.5rem'
              },
              '&:hover': {
                borderRadius: '6px'
              }
            }}
          >
            <Radio checked={selectedValue === label} value={label} onChange={handleChange} />
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SortWidget;
