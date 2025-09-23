import React from "react";

//components
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Stack
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
          <CloseIcon fontSize="medium" />
        </IconButton>
        <Stack alignItems="center" spacing={1.5}>
          <Typography variant="subtitle1" color="grey.900">About dkNET Repo</Typography>
          <Typography variant="body2" sx={{ textAlign: "center" }} color="grey.600">
            This website has been created in order to help researchers to select a data repository, according to the 2023 NIH Data Management and Sharing (DMS) policy.
          </Typography>
        </Stack>
      </Box>
      <Box>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" color="grey.700">Version</Typography>
          <Typography variant="body2" color="grey.600">1.0.1</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2" color="grey.700">Release Date</Typography>
          <Typography variant="body2" color="grey.600">06-03-2025</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between" alignItems="center" style={{ marginTop: '1rem' }}>
          <Typography variant="subtitle2" color="grey.700">dkNET team</Typography>
        </Stack>
        <Stack mt={2}>
          <Typography variant="subtitle2" color="grey.700">Maryann E. Martone</Typography>
          <Typography variant="body2" color="grey.500">University of California, San Diego</Typography>
        </Stack>
        <Divider />
        <Stack>
          <Typography variant="subtitle2" color="grey.700">Fiona Murphy</Typography>
          <Typography variant="body2" color="grey.500">MoreBrains Cooperative</Typography>
        </Stack>
        <Divider />
        <Stack>
          <Typography variant="subtitle2" color="grey.700">Michael Bar-Sinai</Typography>
          <Typography variant="body2" color="grey.500">Associate of IQSS @ Harvard University</Typography>
        </Stack>
        <Divider />
        <Stack>
          <Typography variant="subtitle2" color="grey.700">Jeffrey S. Grethe</Typography>
          <Typography variant="body2" color="grey.500"> University of California, San Diego</Typography>
        </Stack>
        <Divider />
        <Stack>
          <Typography variant="subtitle2" color="grey.700">Ko-Wei Lin</Typography>
          <Typography variant="body2" color="grey.500"> University of California, San Diego</Typography>
        </Stack>
        <Divider />
        <Stack>
          <Typography variant="subtitle2" color="grey.700">Edyta Vieth</Typography>
          <Typography variant="body2" color="grey.500"> University of California, San Diego</Typography>
        </Stack>
        <Divider />
        <Stack>
          <Typography variant="subtitle2" color="grey.700">Marcus Leiwe</Typography>
          <Typography variant="body2" color="grey.500"> MetaCell LTD </Typography>
        </Stack>
        <Divider />
        <Stack>
          <Typography variant="subtitle2" color="grey.700">Dario Del Piano</Typography>
          <Typography variant="body2" color="grey.500"> MetaCell LTD </Typography>
        </Stack>
      </Box>
      <Box mt={9} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="body2" mr={1} color="grey.600">Powered by</Typography>
        <MetacellLogoIcon sx={{ '&.MuiSvgIcon-root': {
          width: 'auto'
        } }}/>
      </Box>
    </Drawer>
  )
}
export default AboutDialog;
