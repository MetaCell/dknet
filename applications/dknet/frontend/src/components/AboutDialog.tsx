import React from "react";

//components
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';

//icons
import CloseIcon from '@mui/icons-material/Close';
import { MetacellLogoIcon } from "../assets/icons";

const AboutDialog = ({ open, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      id="about-window"
      PaperProps={{ sx: { m: 0 } }}
    >
      <Box display="flex" flexDirection="column" alignItems="flex-end" mb={6}>
        <IconButton onClick={onClose}>
          <CloseIcon fontSize="medium"/>
        </IconButton>
        <Box display="flex" flexDirection="column" alignItems="center" gap={1.5}>
          <Typography variant="subtitle1" color="grey.900">About Dknet Repo</Typography>
          <Typography variant="body2" sx={{ textAlign: "center" }} color="grey.600">
            This website has been created in order to help researchers to select a data repository, according to NIH`&apos;` upcoming 2023 policies.
          </Typography>
        </Box>
      </Box>
      <Box p={2} className="disclaimerBox" mb={3}>
        <Typography variant="subtitle2" color="warning.700">Disclaimer</Typography>
        <Typography variant="body2" color="warning.700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.</Typography>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2" color="grey.700">Version</Typography>
          <Typography variant="body2" color="grey.600">0.2</Typography>
        </Box>
        <Divider/>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2" color="grey.700">Release Date</Typography>
          <Typography variant="body2" color="grey.600">2022-01-24</Typography>
        </Box>
        <Divider/>
        <Typography variant="subtitle2" color="grey.700">Authors</Typography>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mt={2}>
          <div>
            <Typography variant="subtitle2" color="grey.700">Maryann E. Martone</Typography>
            <Typography variant="body2" color="grey.500">University of California, San Diego</Typography>
          </div>
          <Typography variant="subtitle2" color="primary.700">Send Email</Typography>
        </Box>
        <Divider/>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <div>
            <Typography variant="subtitle2" color="grey.700">Fiona Murphy</Typography>
            <Typography variant="body2" color="grey.500">MoreBrains Cooperative</Typography>
          </div>
          <Typography variant="subtitle2" color="primary.700">Send Email</Typography>
        </Box>
        <Divider/>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <div>
            <Typography variant="subtitle2" color="grey.700">Michael Bar-Sinai</Typography>
            <Typography variant="body2" color="grey.500">Associate of IQSS @ Harvard University</Typography>
          </div>
          <Typography variant="subtitle2" color="primary.700">Send Email</Typography>
        </Box>
      </Box>
      <Box mt={12} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="body2" mr={1} color="grey.600">Powered by</Typography>
        <MetacellLogoIcon sx={{ '&.MuiSvgIcon-root': {
          width: 'auto'
        } }}/>
      </Box>
    </Drawer>
  )
}
export default AboutDialog;