import React from "react";

//components 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CircularProgressWithLabel from "./CircularProgressWithLabel";

//icons
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const RepositoryCard = () => {
  return (
    <Card sx={{ position:"relative", maxWidth: 789 }} className="successCard">
      <Box pr={3} position="absolute" right={0} top='-3px'>
        <Chip label="Best Match" className="cardBadge"/>
      </Box>
      <Box m={3} display="flex" gap={2.5}>
        <div>
          <CircularProgressWithLabel value={80}/>
        </div>
        <Box display="flex" flexDirection="column" width={1}>
          <Typography variant="subtitle1" color="grey.800">Title</Typography>
          <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
            <Chip label="DataType"/>
            <Chip label="DataType"/>
            <Chip label="DataType"/>
            <Chip label="DataType"/>
            <Chip label="DataType"/>
          </Box>
          <Box mt={2.5} gap={2.5} display="flex" width={1}>
            <Box width={1}>
              <Box display="flex" justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                <Typography variant="body2" color="grey.600">Domain</Typography> 
                <Typography variant="body2" color="grey.600">Microbiome</Typography> 
              </Box> 
              <Box display="flex" justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                <Typography variant="body2" color="grey.600">PHI Support</Typography> 
                <Chip label="Not Supported" color="warning" icon={<ErrorOutlineIcon/>}/>
              </Box> 
              <Box display="flex" justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                <Typography variant="body2" color="grey.600">Funding Source</Typography> 
                <Chip label="NIDDK source only" color="warning" icon={<ErrorOutlineIcon/>}/>
              </Box> 
              <Box display="flex" justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                <Typography variant="body2" color="grey.600">Application</Typography> 
                <Chip label="Not Required" color="success" icon={<CheckCircleOutlineIcon/>}/>
              </Box>
              <Box display="flex" justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                <Typography variant="body2" color="grey.600">Size Limits</Typography>
                <Chip label="Limited" color="warning" icon={<ErrorOutlineIcon/>}/>
              </Box>
              <Box display="flex" justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                <Typography variant="body2" color="grey.600">Costs</Typography>
                <Chip label="Sometimes" color="warning" icon={<ErrorOutlineIcon/>}/>
              </Box>
            </Box>
            <Box width={1}>
              <Box display="flex" justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                <Typography variant="body2" color="grey.600">Domain</Typography> 
                <Typography variant="body2" color="grey.600">Microbiome</Typography> 
              </Box> 
              <Box display="flex" justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                <Typography variant="body2" color="grey.600">PHI Support</Typography> 
                <Chip label="Not Supported" color="warning" icon={<ErrorOutlineIcon/>}/>
              </Box> 
              <Box display="flex" justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                <Typography variant="body2" color="grey.600">Funding Source</Typography> 
                <Chip label="NIDDK source only" color="warning" icon={<ErrorOutlineIcon/>}/>
              </Box> 
              <Box display="flex" justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                <Typography variant="body2" color="grey.600">Application</Typography> 
                <Chip label="Not Required" color="success" icon={<CheckCircleOutlineIcon/>}/>
              </Box>
              <Box display="flex" justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                <Typography variant="body2" color="grey.600">Size Limits</Typography>
                <Chip label="Limited" color="warning" icon={<ErrorOutlineIcon/>}/>
              </Box>
              <Box display="flex" justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                <Typography variant="body2" color="grey.600">Costs</Typography>
                <Chip label="Sometimes" color="warning" icon={<ErrorOutlineIcon/>}/>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}
export default RepositoryCard;