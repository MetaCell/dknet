import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Fade } from '@mui/material';
import { vars } from '../theme/variables';

interface ExpandableTextProps {
  text: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2';
  color?: string;
  maxLines?: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  variant = 'h5',
  color = vars.grey600,
  maxLines = 3,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowReadMore, setShouldShowReadMore] = useState(false);

  useEffect(() => {
    const averageCharsPerLine = 50;
    const maxChars = averageCharsPerLine * maxLines;
    setShouldShowReadMore(text.length > maxChars);
  }, [text, maxLines]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <Fade in={isExpanded} timeout={1000}>
          <Box
            onClick={toggleExpanded}
            sx={{
              backgroundColor: vars.grey25,
              borderRadius: 1,
              padding: 2,
              cursor: 'pointer',
              overflow: 'auto',
              maxHeight: '6.25rem',
              my: 1,
              display: isExpanded ? 'block' : 'none',
              transition: 'background 0.100s ease-in-out',
            }}
          >
            <Typography
              variant={variant}
              sx={{
                fontFamily: vars.primaryFont,
                color,
                lineHeight: 1.5,
                fontSize: variant === 'h5' ? '1rem' : undefined,
                fontWeight: variant === 'h5' ? 400 : undefined,
                margin: 0,
                textAlign: 'left',
              }}
            >
              {text}
            </Typography>
          </Box>
        </Fade>

        <Fade in={!isExpanded} timeout={1000}>
          <Box
            sx={{
              display: !isExpanded ? 'block' : 'none',
              transition: 'background 0.100s ease-in-out',

            }}
          >
            <Typography
              variant={variant}
              sx={{
                fontFamily: vars.primaryFont,
                color,
                lineHeight: 1.5,
                fontSize: variant === 'h5' ? '1rem' : undefined,
                fontWeight: variant === 'h5' ? 400 : undefined,
                textAlign: 'left',
                ...(shouldShowReadMore && {
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: maxLines,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }),
              }}
            >
              {text}
            </Typography>
          </Box>
        </Fade>


        <Button
          onClick={toggleExpanded}
          variant='text'
          sx={{
            zIndex: 1,
            transition: 'transform 0.2s ease-out',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          }}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </Button>
      </Box>
      {shouldShowReadMore && (
        <Fade in={!isExpanded} timeout={300}>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3.8125rem',
              background: `linear-gradient(180deg, rgba(242, 244, 247, 0.00) 0%, rgba(241, 243, 246, 0.92) 48.71%, #F1F3F6 95.81%)`,
              pointerEvents: 'none',
              display: !isExpanded ? 'block' : 'none',
            }}
          />
        </Fade>
      )}
    </Box>
  );
};

export default ExpandableText;