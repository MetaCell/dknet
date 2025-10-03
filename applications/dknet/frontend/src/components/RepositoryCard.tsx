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
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
//icons
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { FilterColor, FilterType } from "../config/enums";

const RepositoryCard = (props) => {
  const { context } = useFilterContext()
  const { isBestMatch, repository } = props;
  const filterLabels = Object.values(repository.attributes)[0] as Array<string>

  const getClass = () => {
    return isBestMatch ? "successCard" : ""
  }

  // TODO: add logic to display the correct icon/text/component based on the repository's dynamic attributes
  return (
    <Card id={"result_" + props.resultIndex} sx={{ position: 'relative' }} className={getClass()}>
      {
        isBestMatch &&
        <Box pr={2.5} position='absolute' right={0} top='-3px'>
          <Chip label="Best Match" className="cardBadge" />
        </Box>
      }
      <Box m={2.5} display="flex" gap={2} flexDirection="column">
        <CardContent sx={{ '&.MuiCardContent-root': { padding: 0 } }}>
          <Stack spacing={1}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" width={1} overflow='hidden'>
              <Tooltip title={repository.label}>
                <Link
                  href={repository.url}
                  target="_blank"
                  variant="subtitle1"
                  color="grey.800"
                  sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    lineHeight: 1,
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {repository.label} {repository.pctMatch !== undefined ? repository.pctMatch ? ` - Score ${repository.pctMatch}%` : "" : ``}
                </Link>
              </Tooltip>
              <ArrowOutwardIcon />
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="h4" color="grey.600">{context.filters[0].label}</Typography>
              {
                filterLabels.length === context.allFilters[0].options.length ? (<Chip label='All' color={'success'} />) : filterLabels.map((row, index) => <Chip key={index} label={row} color={'success'} />)
              }
            </Box>
            <Box display="flex" width={1}>
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
                    <Grid key={"grid_" + index} item xs={12} md={12} lg={6}>
                      <Box display="flex" alignItems="center" height={1} gap={1} justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                        <Typography variant="h4" color="grey.600">{filter.cardText}</Typography>
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
          </Stack>

        </CardContent>
      </Box>
    </Card>
  )
}
export default RepositoryCard;
