import React, { useCallback } from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemText, Stack } from '@mui/material';
import { vars } from '../../theme/variables';
import { ResponsiveConfig, ResultItem } from '../../utils/types';
import { isTopMatch } from '../../utils/helpers';

const {
  grey200,
  white,
  grey700,
  success700,
  success50,
  primary200,
  primary25
} = vars;

const styles = {
  container: (showPreview: boolean, config: ResponsiveConfig) => ({
    transition: 'all ease-in-out .3s',
    width: showPreview ? config.previewWidth : '0',
    minWidth: showPreview ? config.previewWidth : '0',
    maxWidth: showPreview ? config.previewWidth : '0',
    opacity: showPreview ? 1 : 0,
    background: white,
    borderLeft: showPreview ? `1px solid ${grey200}` : 'none',
    position: 'relative',
    overflow: showPreview ? 'auto' : 'hidden',
    padding: '0 1rem'
  }),
  headerBox: {
    p: "2rem 0.5rem 1rem 0.5rem"
  },
  list: {
    gap: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    '& .MuiListItemButton-root': {
      borderRadius: '0.375rem',
      alignItems: 'flex-start',
      minHeight: '3.5rem',
      padding: '0.5rem',

      '&:hover': {
        boxShadow: '0 20px 24px -4px rgba(16, 24, 40, 0.08), 0 8px 8px -4px rgba(16, 24, 40, 0.03)'
      },
      '& .MuiListItemText-primary': {
        fontSize: '0.875rem',
        color: grey700,
        width: '100%',
        paddingRight: '5rem',
      },
      '& .MuiListItemText-secondary': {
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: '1.125rem',
        padding: '0.125rem 0.5rem',
        whiteSpace: 'nowrap',
        color: success700,
        borderRadius: '0 .25rem 0 .25rem',
        background: success50,
        position: 'absolute',
        top: 0,
        right: '.5px',
        margin: 0,
        minWidth: '4.5rem',
        textAlign: 'center'
      }
    }
  },
  listItemButton: {
    topMatch: {
      border: `1px solid ${primary200}`,
      background: primary25,
      '&:hover': {
        background: primary25,
      },
    },
    regular: {
      border: `1px solid ${grey200}`,
      background: white,
      '&:hover': {
        background: white,
      },
    }
  },
  fadeOverlay: (showPreview: boolean) => ({
    content: "''",
    height: '7.75rem',
    zIndex: 1,
    width: '100%',
    display: showPreview ? 'block' : 'none',
    position: 'sticky',
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
    background: `linear-gradient(180deg, rgba(249, 250, 251, 0.00) 0%, #F9FAFB 100%)`,
  })
};

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
  const handleResultClick = useCallback(() => {
    closeDialog();
  }, [closeDialog]);

  const getListItemButtonStyles = useCallback((el: ResultItem, index: number) => {
    return isTopMatch(el, index, results) ? styles.listItemButton.topMatch : styles.listItemButton.regular;
  }, [results]);

  const getSecondaryText = useCallback((el: ResultItem, index: number) => {
    return isTopMatch(el, index, results) ? "Best Match" : null;
  }, [results]);

  const getPrimaryText = useCallback((el: ResultItem) => {
    return !isNaN(el.pctMatch || 0) ? `${el.label} ${el.pctMatch}%` : el.label;
  }, []);

  return (
    <Box
      sx={styles.container(showPreview, config)}
    >
      <Stack spacing={2} sx={styles.headerBox}>
        <Typography variant="h4">Preview of results</Typography>
        {isFiltersEmpty ? (
          <Typography variant="subtitle2">
            Please select at least one filter to see the results
          </Typography>
        ) : (
          <Typography variant="subtitle2">
            {results.length} repositories matching your criteria so far
          </Typography>
        )}
      </Stack>

      <List disablePadding sx={styles.list}>
        {!isFiltersEmpty && results.map((el, index) => (
          <ListItem disablePadding key={`result-${index}`}>
            <ListItemButton
              sx={getListItemButtonStyles(el, index)}
              onClick={handleResultClick}
            >
              <ListItemText
                primary={getPrimaryText(el)}
                secondary={getSecondaryText(el, index)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {
        !isFiltersEmpty && results.length !== 0 && <Box sx={styles.fadeOverlay(showPreview)} />
      }
    </Box>
  );
};

export default PreviewPanel;