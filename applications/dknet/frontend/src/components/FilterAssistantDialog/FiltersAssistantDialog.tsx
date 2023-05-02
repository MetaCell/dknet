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
  const { context, setContext } = useFilterContext()
  const [filters, setFilters] = useState<any>([])
  const [height, setHeight] = useState([]);
  const [translateValue, setTranslateValue] = useState(0);

  const questionsTabs = filters.reduce((filtered, option) => {
    if (option?.question) {
      filtered.push(option);
    }
    return filtered;
  }, []);


  useEffect(() => {
    // TODO: apply context.filterValues on the allFilters and create the filters
    const filters = context.allFilters //
    setFilters(filters)
  }, [context])

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

  return (
    <Dialog
      open={open}
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
        borderBottom: '0.0625rem solid #EAECF0',
      }}>
        <Typography variant='h2'>
          Filtering Assistant
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#F9FAFB", height: 'calc(100vh - 3.60rem)' }}>
        <FilterQuestions
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
          closeDialog={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
