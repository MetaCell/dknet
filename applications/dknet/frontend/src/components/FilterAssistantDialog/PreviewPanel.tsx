import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { vars } from '../../theme/variables';
import { ResponsiveConfig, ResultItem } from './types';

const {
  grey200,
  white,
  grey700,
  success700,
  success50,
  primary200,
  cardBgColor,
  checkboxBorderColor
} = vars;

interface PreviewPanelProps {
  showPreview: boolean;
  config: ResponsiveConfig;
  isFiltersEmpty: boolean;
  results: ResultItem[];
  closeDialog: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  showPreview,
  config,
  isFiltersEmpty,
  results,
  closeDialog
}) => {
  const handleResultClick = (index: number) => {
    closeDialog();
    const element = document.getElementById('result_' + index);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const getListItemButtonStyles = (el: ResultItem, index: number) => {
    const isTopMatch = (index === 0 || el.pctMatch === results[0]?.pctMatch) && !isNaN(el.pctMatch || 0);

    return isTopMatch ? {
      border: `0.0625rem solid ${primary200}`,
      background: cardBgColor,
      '&:hover': {
        background: cardBgColor,
      },
    } : {
      border: `0.0625rem solid ${checkboxBorderColor}`,
      background: white,
      '&:hover': {
        background: white,
      },
    };
  };

  const getSecondaryText = (el: ResultItem, index: number) => {
    const isTopMatch = (index === 0 || el.pctMatch === results[0]?.pctMatch) && !isNaN(el.pctMatch || 0);
    return isTopMatch ? "Best Match" : null;
  };

  const getPrimaryText = (el: ResultItem) => {
    return !isNaN(el.pctMatch || 0) ? `${el.label} ${el.pctMatch}%` : el.label;
  };

  return (
    <Box
      sx={{
        transition: 'all ease-in-out .3s',
        width: showPreview ? config.previewWidth : '0',
        minWidth: showPreview ? config.previewWidth : '0',
        maxWidth: showPreview ? config.previewWidth : '0',
        opacity: showPreview ? 1 : 0,
        background: white,
        borderLeft: showPreview ? `0.0625rem solid ${grey200}` : 'none',
        position: 'relative',
        overflow: showPreview ? 'auto' : 'hidden',
        height: '100%',
        '&:after': {
          content: "''",
          background: 'linear-gradient(180deg, rgba(249, 250, 251, 0.00) 0%, #F9FAFB 100%)',
          height: '7.75rem',
          zIndex: 1,
          width: '100%',
          display: showPreview ? 'block' : 'none',
          position: 'sticky',
          bottom: 0,
          left: 0,
          pointerEvents: 'none',
        }
      }}
    >
      <Box pt={4} px={3} pb={2}>
        <Typography variant="h4">Preview of results</Typography>
        {isFiltersEmpty ? (
          <Typography sx={{ mt: 2 }} variant="subtitle2">
            Please select at least one filter to see the results
          </Typography>
        ) : (
          <Typography sx={{ mt: 2 }} variant="subtitle2">
            {results.length} repositories matching your criteria so far
          </Typography>
        )}
      </Box>

      <List disablePadding sx={{
        gap: 1,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        '& .MuiListItemButton-root': {
          borderRadius: '0.375rem',
          alignItems: 'flex-start',
          minHeight: '3.625rem',
          p: 1,
          '&:hover': {
            boxShadow: '0rem 1.25rem 1.5rem -0.25rem rgba(16, 24, 40, 0.08), 0rem 0.5rem 0.5rem -0.25rem rgba(16, 24, 40, 0.03)'
          },
          '& .MuiListItemText-root': {
            margin: 0,
            display: 'flex',
            gap: '0.25rem',
            alignItems: 'flex-start'
          },
          '& .MuiListItemText-primary': {
            fontSize: '0.875rem',
            lineHeight: '142.857%',
            color: grey700,
          },
          '& .MuiListItemText-secondary': {
            fontSize: '0.75rem',
            lineHeight: '150%',
            padding: '0.125rem 0.5rem',
            whiteSpace: 'nowrap',
            color: success700,
            marginTop: '-0.5rem',
            marginRight: '-0.5rem',
            fontWeight: 500,
            borderRadius: '0rem 0rem 0.25rem 0.25rem',
            background: success50,
            mixBlendMode: 'multiply',
          }
        }
      }}>
        {!isFiltersEmpty && results.map((el, index) => (
          <ListItem disablePadding key={`result-${index}`}>
            <ListItemButton
              sx={getListItemButtonStyles(el, index)}
              onClick={() => handleResultClick(index)}
            >
              <ListItemText
                primary={getPrimaryText(el)}
                secondary={getSecondaryText(el, index)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default PreviewPanel;