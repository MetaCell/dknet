import React, { FC, memo } from "react";
import { Box, FormLabel, IconButton, List, ListItem, Stack, Tooltip, Typography } from "@mui/material";
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CustomizedRadios from "./widgets/RadioWidget";
import { vars } from "../theme/variables";

const { grey700, grey400, grey200 } = vars;

interface Item {
  code: string,
  label: string,
  icon?: string,
  color?: string,
  weighting?: 1
}

interface NestedListViewProps {
  data: {
    label: string;
    question?: string;
    options: Item[];
  };
  
}

const formLabelStyles = {
  color: grey700,
};

const iconButtonStyles = {
  p: '0.125rem',
};

const listStyles = {
  marginLeft: '-0.625rem',
  '& .MuiFormControlLabel-root': {
    alignItems: 'flex-start',
  },
  '& .MuiListItemText-root': {
    flex: 1,
    margin: 0,
    '& .MuiTypography-root': {
      lineHeight: 1,
    },
  },
  '& .MuiListItem-root': {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '&:not(:first-of-type)': {
      marginTop: '0.5rem',
    },
    '& .MuiList-root': {
      borderLeft: `0.0625rem solid ${grey200}`,
      marginLeft: '0.625rem',
      paddingLeft: '1.125rem',
      marginTop: '0.5rem',
    },
  },
};

const NestedListItem: FC<{ item: Item; depth: number; }> = memo(({ item, depth }) => {
  const changeSelection = (e: string): any => {
    console.log('changeSelection', e);
  }

  return (<ListItem disablePadding sx={{ pl: depth * 2.5 }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderLeft: `0.0625rem solid ${depth > 0 ? grey200 : 'transparent'}`,
        pl: "0.625rem",
      }}
    >
      <CustomizedRadios data={{ label: item.label, code: item.code }} />
    </Box>
  </ListItem>)
});

NestedListItem.displayName = 'NestedListItem';

const NestedListView: FC<NestedListViewProps> = ({ data }) => {
  console.log('NestedListView', data);
  const changeSelection = (e: string): any => {
    console.log('changeSelection', e);
  }

  return (<Box display='flex' flexDirection='column' gap={1}>
    <FormLabel component="legend" sx={formLabelStyles}>
      <Stack direction="row" alignItems='center' justifyContent="space-between">
        <Typography component='h4'>{data.label}</Typography>
        <Stack direction="row">
          <Tooltip title={data.question}>
            <IconButton sx={iconButtonStyles}>
              <HelpOutlineIcon sx={{ color: grey400 }} />
            </IconButton>
          </Tooltip>
          <IconButton sx={iconButtonStyles}>
            <CleaningServicesOutlinedIcon sx={{ color: grey400 }} />
          </IconButton>
        </Stack>
      </Stack>
    </FormLabel>

    <List disablePadding sx={listStyles}>
      {data?.options?.map((item, index) => (
        <NestedListItem key={item.code} item={item} depth={index} />
      ))}
    </List>
  </Box>);
};

NestedListView.displayName = 'NestedListView';

export default memo(NestedListView);
