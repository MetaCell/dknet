import React, { useState } from "react"
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

const {
  grey200,
  grey50
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

  // Set initial preview state based on screen size
  const [showPreview, setShowPreview] = useState(() => {
    return screenSize !== 'tooSmall';
  });

  const questionsTabs = context.allFilters.filter((option) => (option.question && option.inputType !== "READONLY"))

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    updateProgress(newValue);
  };


  const onClickNext = () => {
    if (tabValue !== (questionsTabs.length - 1)) {
      setTabValue(tabValue + 1)
      updateProgress(tabValue + 1)
    }
  }

  const onClickPrev = () => {
    setTabValue(tabValue - 1)
    updateProgress(tabValue - 1)
  }

  const updateProgress = (number) => {
    const newProgressValue = (number / (questionsTabs.length - 1)) * 100
    setProgress(newProgressValue)
  }

  const closeDialog = () => {
    setOpen(false);
    setTabValue(0);
    setProgress(0);
  }

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
      <DialogTitle sx={{
        borderBottom: `0.0625rem solid ${grey200}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant='h2'>
          Filtering Assistant
        </Typography>
        <Box display='flex' alignItems='center' gap={1}>
          <Button
            variant='outlined'
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[700],
            }}
          >
            Cancel
          </Button>
          {(context.results.length > 0 && !context.showAll) ?
            (<Button
              variant='contained'
              aria-label="close"
              onClick={() => {
                handleClose();
                document.getElementById('result_0').scrollIntoView({ behavior: 'smooth' });
              }}
              sx={{
                color: (theme) => theme.palette.grey[200],
              }}
            >
              Go To Results ({context.results.length})
            </Button>) : <></>
          }
          <Divider sx={{
            width: '0.0625rem',
            height: '2rem',
            background: grey200,
          }} />
          <IconButton className={`outlined ${showPreview ? 'active' : ''}`} onClick={() => setShowPreview(!showPreview)}>
            <PreviewIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: grey50, height: 'calc(100vh - 3.60rem)' }}>
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
