import React from "react";

//components 
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid"; 
import Typography from "@mui/material/Typography";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

//icons
import { FeaturedIcon, FeaturedIconChecked } from "../icons";

const Item = styled(Box)(({ theme }) => ({
  display: 'flex',
  border: `1px solid ${theme.palette.grey[200]}`,
  borderRadius: '12px',
  width: '100%',
  '& .MuiCheckbox-root': {
    padding: 0
  },
  '& .MuiTypography-body2': {
    color: theme.palette.grey[700],
    marginLeft: '12px',
    display: 'inline-block',
    width: '138px',
    whiteSpace: 'nowrap',
    overflow: 'hidden !important',
    textOverflow: 'ellipsis'
  },
  '& .MuiTypography-body1': {
    color: theme.palette.grey[700],
    fontWeight: 500,
    fontSize: '0.875rem',
    marginTop: '8px'
  },
  '&:hover': {
    backgroundColor: '#F8FDFA',
    border: `2px solid ${theme.palette.primary['main']}}`,
  }
}))
const BpIcon = styled('span')(() => ({
  borderRadius: 4,
  width: 16,
  height: 16,
  border: `1px solid #D0D5DD`
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#F8FDFA',
  border: `1px solid #0BA47D`,
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%230BA47D'/%3E%3C/svg%3E\")",
    content: '""',
  },
});

function ItemCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

const QuestionBox = () => {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
    gd: false
  });
    
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
    
  const { gilad, jason, antoine } = state;

  return (
    <Box sx={{
      background: '#FFF',
      borderRadius: 6,
      padding: 2,
      boxShadow: '0px 10px 40px -10px #EAECF0, 0px 0px 1px rgba(0, 0, 0, 0.25)'
    }}>
      <Grid container gap={1.5}>
        <Grid item display="flex" gap={1.5} width={1}>
          <Item p={2} >
            <ItemCheckbox checked={gilad} onChange={handleChange} name="gilad"/>
            <Typography variant="body2">Addiction & HIV</Typography> 
          </Item>
          <Item p={2}>
            <ItemCheckbox checked={jason} onChange={handleChange} name="jason"/>
            <Typography variant="body2">Cancer</Typography>
          </Item>
          <Item p={2}>
            <ItemCheckbox checked={antoine} onChange={handleChange} name="antoine"/>
            <Typography variant="body2">Chemistry, chemical biology and biochemistry</Typography>
          </Item>
        </Grid>
        <Grid item display="flex" gap={2} width={1}>
          <Item pb={4} pt={4} justifyContent="center" alignItems="center" flexDirection='column'>
            <Checkbox
              sx={{ '& .MuiSvgIcon-root': { fill: 'none' } }}
              icon={<FeaturedIcon/>}
              checkedIcon={<FeaturedIconChecked/>}
            />
            <Typography variant="body1">Multiple</Typography>
          </Item>
          <Item pb={4} pt={4} justifyContent="center" alignItems="center" flexDirection='column'>
            <Checkbox
              sx={{ '& .MuiSvgIcon-root': { fill: 'none' } }}
              icon={<FeaturedIcon/>}
              checkedIcon={<FeaturedIconChecked/>}
            />
            <Typography variant="body1">Only one</Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}
export default QuestionBox;