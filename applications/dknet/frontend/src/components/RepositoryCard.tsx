import React from "react";
import { useFilterContext } from '../context/Context'

//components
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import CardContent from "@mui/material/CardContent";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
//icons
import { FilterColor, FilterType } from "../config/enums";
import { useResponsive } from "../hooks/useResponsive";

const RepoCardContent = styled(CardContent)(() => ({
  '&.MuiCardContent-root': {
    padding: 0
  }
}));

const CardTitleLink = styled(Link)(() => ({
  display: '-webkit-box',
  overflow: 'hidden',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
  textOverflow: 'ellipsis',
}));

const RepositoryCard = (props) => {
  const { context } = useFilterContext()
  const { isBestMatch, repository } = props;
  const filterLabels = Object.values(repository.attributes)[0] as Array<string>
  const { screenSize } = useResponsive();

  const getClass = () => {
    return isBestMatch ? "successCard" : ""
  }

  // Responsive configurations
  const getCardSpacing = () => {
    switch (screenSize) {
      case 'tablet':
        return { margin: 2.5, gap: 2, marginBottom: '0.875rem' };
      case 'laptop':
        return { margin: 3, gap: 2.5, marginBottom: '1rem' };
      case 'desktop':
        return { margin: 3.5, gap: 3, marginBottom: '1.25rem' };
      default:
        return { margin: 3, gap: 2.5, marginBottom: '1rem' };
    }
  };

  const spacing = getCardSpacing();

  // TODO: add logic to display the correct icon/text/component based on the repository's dynamic attributes
  return (
    <Card id={"result_" + props.resultIndex} sx={{ position: 'relative', marginBottom: spacing.marginBottom }} className={getClass()}>
      {
        isBestMatch &&
        <Box pr={spacing.margin} position='absolute' right={0} top='-3px'>
          <Chip label="Best Match" className="cardBadge" />
        </Box>
      }
      <Box m={spacing.margin} display="flex" gap={spacing.gap}>
        <RepoCardContent>
          <Box display="flex" flexWrap='wrap' width={1} overflow='hidden'>
            <Tooltip title={repository.label}>
              <CardTitleLink
                href={repository.url}
                target="_blank"
                underline='hover'
                variant="subtitle1" color="grey.800"
              >
                {repository.label} {repository.pctMatch !== undefined ? repository.pctMatch ? ` - Score ${repository.pctMatch}%` : "" : ``}
              </CardTitleLink>
            </Tooltip>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
            <Typography sx={{ fontSize: '0.875rem !important', fontWeight: 500, marginRight: '1rem' }} color="grey.600">{context.filters[0].label}</Typography>
            {
              filterLabels.length === context.allFilters[0].options.length ? (<Chip sx={{ fontSize: '20rem !important', padding: '0.5rem', border: '0.0625rem solid #83DCB2' }} label='All' color={'success'} />) : filterLabels.map((row, index) => <Chip sx={{ fontSize: '20rem !important', padding: '0.5rem', border: '0.0625rem solid #83DCB2' }} key={index} label={row} color={'success'} />)
            }
          </Box>
          <Box mt={2.5} display="flex" width={1}>
            <Grid container columnSpacing={3}>
              {context.allFilters.slice(1).filter((filter: any) => filter.label).map((filter: any, index: any) => {

                const attributeValues = repository.attributes[filter.code]
                if (!attributeValues) {
                  return null
                }
                const filtersUsed = context.filterValues[filter.code]
                  ? (Array.isArray(context.filterValues[filter.code])
                    ? context.filterValues[filter.code].map(item => item.code)
                    : [context.filterValues[filter.code].code])
                  : [];
                return (
                  <Grid key={"grid_" + index} item md={6}>
                    <Box display="flex" alignItems="center" height={1} gap={1} justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                      <Typography variant="body2" color="grey.600">{filter.cardText}</Typography>
                      <Box display="flex" gap={1} alignItems='center' flexWrap='wrap'>
                        {
                          attributeValues.length === filter.options.length && filter.inputType === FilterType.Multiple
                            ? (<Chip label='All' color={FilterColor.Success} />)
                            : attributeValues.map((attribute: any) =>
                              filter.options.map((option: any, index: any) => (option.code === attribute &&
                                <Chip key={"chip_" + index} label={option.label} color={filtersUsed.includes(attribute) ? FilterColor.Success : FilterColor.Info} />
                              ))
                            )
                        }
                      </Box>
                    </Box>
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        </RepoCardContent>
      </Box>
    </Card>
  )
}
export default RepositoryCard;
