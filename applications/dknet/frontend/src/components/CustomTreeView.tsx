import React from "react"
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import CustomizedRadios from "./widgets/RadioWidget";
import { Box, FormLabel, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { vars } from "../theme/variables";
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"


const {
  grey700,
  grey400
} = vars;

const CustomTreeItem = (props) => {
  const { label, itemId, children, ...rest } = props;

  return (
    <TreeItem
      itemId={itemId}
      label={<CustomizedRadios data={{ label }} />}
      {...rest}
    >
      {children}
    </TreeItem>
  );
};

const CustomTreeView = ({ data, treeData }) => {
  const renderTree = (nodes) => (
    <CustomTreeItem key={nodes.itemId} itemId={nodes.itemId} label={nodes.label}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </CustomTreeItem>
  );
  return (
    <Box display='flex' flexDirection='column' gap={1}>
      <FormLabel
        component="legend"
        sx={{
          color: grey700
        }}
      >
        <Stack direction="row" alignItems='center' justifyContent="space-between">
          <Typography component='h4'>
            {data.label}
          </Typography>
          <Stack direction="row">
            <IconButton sx={{ p: '0.125rem' }}>
              <CleaningServicesOutlinedIcon sx={{
                color: grey400
              }} />
            </IconButton>
            <Tooltip title={data.description}>
              <IconButton sx={{ p: '0.125rem' }}>
                <HelpOutlineIcon sx={{
                  color: grey400,
                }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </FormLabel>

      <SimpleTreeView
        slots={{
          collapseIcon: () => null,
          expandIcon: () => null,
          endIcon: () => null,
        }}
      >
        {treeData.map((data) => renderTree(data))}
      </SimpleTreeView>
    </Box>
  )
}

export default CustomTreeView;