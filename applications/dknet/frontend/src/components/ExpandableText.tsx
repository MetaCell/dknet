import React, { useState, useCallback } from 'react';
import { Box, Typography, Button, Fade } from '@mui/material';
import { vars } from '../theme/variables';


const styles = {
  button: {
    zIndex: 1,
    transition: 'transform 0.2s ease-out',
    '&:hover': {
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },
  gradient: {
    position: 'absolute',
    bottom: -16,
    left: 0,
    right: 0,
    height: '3.8125rem',
    background: `linear-gradient(180deg, rgba(242, 244, 247, 0.00) 0%, rgba(241, 243, 246, 0.92) 48.71%, #F1F3F6 95.81%)`,
    pointerEvents: 'none',
  },
};

interface ExpandableTextProps {
  text: string;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded ? text : text.slice(0, 250);
  const shouldShowMoreButton = text.length > 250; // Approximate 3 lines

  const toggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  return (
    <Box>
      <Box sx={{ textAlign: 'left', position: 'relative', }}>
        <Typography sx={{
          wordBreak: 'break-word',
          backgroundColor: isExpanded ? vars.grey25 : 'transparent',
          px: isExpanded ? 2 : 0,
          maxHeight: '6.25rem',
          overflow: 'auto',
          borderRadius: '0.5rem',
          transition: 'all 0.5s ease',
          color: vars.grey600,
        }}>
          {displayText}
          {!isExpanded && text.length > 250 && '...'}

        </Typography>
        {shouldShowMoreButton && (
          <Fade in={!isExpanded} timeout={300}>
            <Box
              sx={{
                ...styles.gradient,
                display: !isExpanded ? 'block' : 'none',
              }}
            />
          </Fade>
        )}
      </Box>

      {shouldShowMoreButton && (
        <Button
          onClick={toggleExpanded}
          variant='text'
          sx={styles.button}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </Button>
      )}

    </Box>
  );
};

export default ExpandableText;