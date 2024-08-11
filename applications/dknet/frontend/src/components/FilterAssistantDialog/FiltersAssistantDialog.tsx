import React, { useEffect, useState } from "react"
import { useFilterContext } from '../../context/Context'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FilterQuestions from "./FilterQuestions";
import { PreviewIcon } from "../../assets/icons";
import { Box, Divider } from "@mui/material";
import { vars } from "../../theme/variables";

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
  const [height, setHeight] = useState([]);
  const [translateValue, setTranslateValue] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const questionsTabs = context.allFilters.filter((option) => (option.question && option.inputType !== "READONLY"))

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue((prevValue) => {
      if (newValue === prevValue + 1) { // when next tab question is clicked on
        setTranslateValue((prev) => {
          return prev + height[tabValue]
        })
      } else if (newValue === prevValue - 1) { // when previous tab question is clicked on
        setTranslateValue((prev) => {
          return prev - height[tabValue - 1]
        })
      } else if (newValue > prevValue + 1) { // when other than next question is selected in increasing order
        const sum = height?.slice(0, newValue)?.reduce((acc, index) => (acc + index), 0);
        setTranslateValue(sum);
      } else { // when other than previous question is selected in decreasing order
        const sum = height?.slice(0, newValue - 1)?.reduce((acc, index) => (acc + index), 0);
        setTranslateValue((prev) => {
          return prev - sum
        })
      }

      return newValue
    });
  };


  const onClickNext = () => {
    if ( tabValue !== (questionsTabs.length - 1)) {
      setTabValue(tabValue+1)
      updateProgress(tabValue+1)
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
    setTranslateValue(0);
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
      maxWidth='lg'
      fullWidth={true}
      sx={{
        "& .MuiPaper-root": {
          height: '100%',
          borderRadius: '0.75rem'
        }
      }}
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
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
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
          setHeight={setHeight}
          open={open}
          questionsTabs={questionsTabs}
          onClickNext={onClickNext}
          progress={progress}
          handleChange={handleChange}
          onClickPrev={onClickPrev}
          value={tabValue}
          height={height}
          setTranslateValue={setTranslateValue}
          translateValue={translateValue}
          closeDialog={closeDialog}
        />
      </DialogContent>
    </Dialog>
  );
}
