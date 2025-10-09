import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import { TopIcon } from "../assets/icons";
import { vars } from "../theme/variables";
import FiltersAssistantDialog from "./FilterAssistantDialog/FiltersAssistantDialog";
import { useFilterContext } from "../context/Context";
import { isFiltersEmpty } from "../utils/helpers";

const { primary600 } = vars;

const buttonStyle = {
  borderRadius: '6.25rem',
  border: `0.0625rem solid ${primary600}`,
  background: primary600,
  boxShadow: '0rem 1.25rem 1.5rem -0.25rem rgba(16, 24, 40, 0.08), 0rem 0.5rem 0.5rem -0.25rem rgba(16, 24, 40, 0.03)',
  '&:hover': {
    background: primary600,
  }
}

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const ScrollToTop = () => {
  const [open, setOpen] = React.useState(false);
  const { context } = useFilterContext();
  const isFilterValuesEmpty = isFiltersEmpty(context.filterValues);
  const { allRepositories, allFilters, showAll } = context;

  const showScrollToTop = (allRepositories.length > 0 && allFilters.length > 0) && (!isFilterValuesEmpty || showAll);

  const openFilterAssistant = () => {
    setOpen(true);
  };

  if (!showScrollToTop) {
    return null;
  }

  return (
    <>
      <Box sx={{
        position: 'fixed',
        right: '1.5rem',
        bottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        zIndex: 1000,
      }}>
        <Button sx={buttonStyle} variant="contained" onClick={openFilterAssistant}>Open Guided Query</Button>

        <IconButton
          onClick={scrollTop}
          sx={buttonStyle}
        >
          <TopIcon />
        </IconButton>
      </Box>
      <FiltersAssistantDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default ScrollToTop;
