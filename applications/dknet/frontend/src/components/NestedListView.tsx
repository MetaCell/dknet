import React, { ChangeEvent, FC, memo } from "react";
import { Box, Button, FormLabel, IconButton, List, ListItem, Stack, Tooltip, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CustomizedRadios from "./widgets/RadioWidget";
import RadioGroup from "@mui/material/RadioGroup";
import { vars } from "../theme/variables";
import { useFilterContext } from "../context/Context";
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

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
    code: string;
  };

}

const formLabelStyles = {
  color: grey700,
};

const iconButtonStyles = {
  height: 'fit-content', p: 0
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
  const { context, setContext } = useFilterContext();

  const onClearFilter = () => {
    setContext({
      ...context,
      showAll: true,
      filterValues: {
        ...context.filterValues,
        [data.code]: undefined
      }
    })
  };

  const changeSelection = (event: ChangeEvent<HTMLInputElement>, value: string): any => {
    const newValue = data.options.find((item) => item.code === value);
    setContext({
      ...context,
      filterValues: {
        ...context.filterValues,
        [data.code]: newValue
      }
    })
  }

  return (<Box display='flex' flexDirection='column' gap={1}>
    <FormLabel component="legend" sx={formLabelStyles}>
      <Stack direction="row" alignItems='center' justifyContent="space-between">
        <Typography variant='h4' flex={1}>{data.label}</Typography>
        <Stack direction="row" flex={1} flexShrink={0} gap={1} justifyContent="flex-end">
          <Tooltip title={data.question}>
            <IconButton sx={iconButtonStyles}>
              <HelpOutlineIcon sx={{ color: grey400 }} />
            </IconButton>
          </Tooltip>
          <Button
            variant='text'
            onClick={onClearFilter}
            startIcon={<FilterListOffIcon />}
            disabled={!context.filterValues?.[data.code]}
            sx={{
              height: 'fit-content',
              minHeight: 0,
              p: 0,
            }}
          >Reset filter</Button>
        </Stack>
      </Stack>
    </FormLabel>

    <List disablePadding sx={listStyles}>
      <RadioGroup
        value={context?.filterValues[data.code]?.code || ""}
        onChange={changeSelection}
      >
        {data?.options?.map((item, index) => (
          <NestedListItem key={"nestedListItem_" + index} item={item} depth={index} />
        ))}
      </RadioGroup>
    </List>
  </Box>);
};

NestedListView.displayName = 'NestedListView';

export default memo(NestedListView);
