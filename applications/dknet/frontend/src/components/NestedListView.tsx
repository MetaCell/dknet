import React, { FC, memo } from "react";
import { Box, FormLabel, IconButton, List, ListItem, ListItemText, Stack, Tooltip, Typography } from "@mui/material";
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CustomizedRadios from "./widgets/RadioWidget";
import { vars } from "../theme/variables";

const { grey700, grey400, grey200 } = vars;

interface Item {
  itemId: string;
  label: string;
}

interface NestedListViewProps {
  data: {
    label: string;
    description?: string;
  };
  listData: Item[];
}

const formLabelStyles = {
  color: grey700,
};

const iconButtonStyles = {
  p: '0.125rem',
};

const listStyles = {
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

const NestedListItem: FC<{ item: Item; depth: number }> = memo(({ item, depth }) => (
  <ListItem disablePadding sx={{ pl: depth * 2 }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderLeft: depth > 0 ? `0.0625rem solid ${grey200}` : "none",
        pl: depth > 0 ? "0.625rem" : "0",
      }}
    >
      <CustomizedRadios data={{ label: item.label }} />
    </Box>
  </ListItem>
));

NestedListItem.displayName = 'NestedListItem';

const NestedListView: FC<NestedListViewProps> = ({ data, listData }) => (
  <Box display='flex' flexDirection='column' gap={1}>
    <FormLabel component="legend" sx={formLabelStyles}>
      <Stack direction="row" alignItems='center' justifyContent="space-between">
        <Typography component='h4'>{data.label}</Typography>
        <Stack direction="row">
          <IconButton sx={iconButtonStyles}>
            <CleaningServicesOutlinedIcon sx={{ color: grey400 }} />
          </IconButton>
          <Tooltip title={data.description}>
            <IconButton sx={iconButtonStyles}>
              <HelpOutlineIcon sx={{ color: grey400 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </FormLabel>

    <List disablePadding sx={listStyles}>
      {listData?.map((item, index) => (
        <NestedListItem key={item.itemId} item={item} depth={index} />
      ))}
    </List>
  </Box>
);

NestedListView.displayName = 'NestedListView';

export default memo(NestedListView);
