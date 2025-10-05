import React, { useCallback } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useFilterContext } from "../context/Context";
import { resetFilters } from "../utils/helpers";
import { EmptyStateIllustration } from "../assets/icons";

const EmptyResultsLayout = () => {
  const { context, setContext } = useFilterContext();

  const onClearFilters = useCallback(() => {
    setContext({
      ...context,
      filterValues: resetFilters(context.filters)
    });
  }, [context, setContext]);

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      width: '100%'
    }}>
      <Stack spacing={3} alignItems="center">
        <EmptyStateIllustration />
        <Typography variant="h2">
          No repository found
        </Typography>
        <Typography variant="subtitle2" color="grey.600" textAlign="center">
          We have not been able to find a repository matching <br /> all of your criteria. Read our guide on how to optimize <br /> the results of your research to learn more.
        </Typography>
        <Button variant="outlined" onClick={onClearFilters}>
          Clear all filters
        </Button>
      </Stack>
    </Box >
  );
};

export default EmptyResultsLayout;
