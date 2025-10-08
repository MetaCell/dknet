import React, { useState, useCallback } from "react"
import { useFilterContext } from '../../context/Context'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FilterQuestions from "./FilterQuestions";
import { PreviewIcon } from "../../assets/icons";
import { Box, Divider } from "@mui/material";
import { vars } from "../../theme/variables";
import { useResponsive } from '../../hooks/useResponsive';
import { hasActiveFilters } from "../../utils/helpers";
import { RESPONSIVE_CONFIGS } from "../../utils/constants";

const {
  grey200,
  grey100
} = vars;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function FiltersAssistantDialog({ open, setOpen }) {
  const [tabValue, setTabValue] = useState(0);
  const [progress, setProgress] = useState(0);
  const { context } = useFilterContext()
  const { screenSize } = useResponsive();

  // Set initial preview state based on screen size config
  const [showPreview, setShowPreview] = useState(() => {
    const config = RESPONSIVE_CONFIGS[screenSize] || RESPONSIVE_CONFIGS.default;
    return config.showPreviewByDefault;
  });

  const questionsTabs = context.allFilters.filter((option) => (option.question && option.inputType !== "READONLY"))

  const handleClose = useCallback(() => {
    setOpen(false);
    setTabValue(0);
    setProgress(0);
    // Reset preview state to default based on screen size config
    const config = RESPONSIVE_CONFIGS[screenSize] || RESPONSIVE_CONFIGS.default;
    setShowPreview(config.showPreviewByDefault);
  }, [setOpen, screenSize]);

  const updateProgress = useCallback((number) => {
    const newProgressValue = (number / (questionsTabs.length - 1)) * 100
    setProgress(newProgressValue)
  }, [questionsTabs.length]);

  const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    updateProgress(newValue);
  }, [updateProgress]);

  const onClickNext = useCallback(() => {
    if (tabValue !== (questionsTabs.length - 1)) {
      setTabValue(tabValue + 1)
      updateProgress(tabValue + 1)
    }
  }, [tabValue, questionsTabs.length, updateProgress]);

  const onClickPrev = useCallback(() => {
    setTabValue(tabValue - 1)
    updateProgress(tabValue - 1)
  }, [tabValue, updateProgress]);

  const closeDialog = useCallback(() => {
    setOpen(false);
    setTabValue(0);
    setProgress(0);
    // Reset preview state to default based on screen size config
    const config = RESPONSIVE_CONFIGS[screenSize] || RESPONSIVE_CONFIGS.default;
    setShowPreview(config.showPreviewByDefault);
  }, [setOpen, screenSize]);

  const hasFiltersApplied = hasActiveFilters(context.filterValues)

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
      maxWidth={screenSize === 'desktop' ? 'xl' : 'lg'}
      fullWidth={true}
    >
      <DialogTitle>
        <Typography variant='h2'>
          Guided Query
        </Typography>
        <Box display='flex' alignItems='center' gap={1}>
          <Button
            variant='text'
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[700],
            }}
          >
            Cancel
          </Button>
          <Button
            variant='outlined'
            aria-label="close"
            onClick={() => {
              handleClose();
            }}
            disabled={context.results.length === 0 || !hasFiltersApplied}
          >
            Go To Results ({hasFiltersApplied ? context.results.length : 0})
          </Button>
          <Divider orientation="vertical" sx={{ height: '2rem', background: grey200 }} />
          <IconButton className={`outlined ${showPreview ? 'active' : ''}`} onClick={() => setShowPreview(!showPreview)}>
            <PreviewIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: grey100 }}>
        <FilterQuestions
          showPreview={showPreview}
          questionsTabs={questionsTabs}
          onClickNext={onClickNext}
          progress={progress}
          handleChange={handleChange}
          onClickPrev={onClickPrev}
          value={tabValue}
          closeDialog={closeDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
