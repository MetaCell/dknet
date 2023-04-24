import React, { useEffect, useState } from "react"
import { useFilterContext } from '../context/Context'
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
  const [value, setValue] = useState(0);
  const [progress, setProgress] = useState(0);
  const { context, setContext } = useFilterContext()
  const [ filters, setFilters ] = useState<any>([])

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
    setValue(newValue);
  };


  const onClickNext = () => {
    if ( value !== (questionsTabs.length - 1)) {
      setValue(value+1)
      updateProgress(value+1)
    }
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
          borderRadius: '12px'
        }
      }}
    >
      <DialogTitle sx={{
        borderBottom: '1px solid #EAECF0',
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
      <DialogContent sx={{ backgroundColor: "#F9FAFB" }}>
        <FilterQuestions questionsTabs={questionsTabs} onClickNext={onClickNext} progress={progress} handleChange={handleChange} value={value} />
      </DialogContent>
    </Dialog>
  );
}
