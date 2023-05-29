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
import * as MUIcon from "@mui/icons-material"

const RepoCardContent= styled(CardContent)(() => ({
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

const getMuiIcon = (icon) => {
  if (!icon) {
    return null
  }
  const Icon = icon && MUIcon[icon]
  return (Icon && <Icon />)
}

const RepositoryCard = (props) => {
  const { context } = useFilterContext()
  const { isBestMatch, repository } = props;
  const filterLabels = Object.values(repository.attributes)[0] as Array<string>

  // TODO: add logic to display the correct icon/text/component based on the repository's dynamic attributes
  return (
    <Card sx={{ position: 'relative', marginBottom: '1rem' }} className={isBestMatch && "successCard"}>
      {
        isBestMatch &&
          <Box pr={3} position='absolute' right={0} top='-3px'>
            <Chip label="Best Match" className="cardBadge"/>
          </Box>
      }
      <Box m={3} display="flex" gap={2.5}>
        <RepoCardContent>
          <Box display="flex" flexWrap='wrap' width={1} overflow='hidden'>
            <Tooltip title={repository.label}>
              <CardTitleLink
                href={repository.url}
                target="_blank"
                underline='hover'
                variant="subtitle1" color="grey.800"
              >
                {repository.label} - Score: {repository.pctMatch}% ({repository.score} points)
              </CardTitleLink>
            </Tooltip>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
            {
              filterLabels.map((row, index) => <Chip key={index} label={row} />)
            }
          </Box>
          <Box mt={2.5} display="flex" width={1}>
            <Grid container columnSpacing={3}>
              {context.allFilters.slice(1).filter((filter: any) => filter.label).map((filter: any) => {

                const attributeValues = repository.attributes[filter.code]
                if (!attributeValues) {
                  return null
                }
                return (
                  <Grid key={filter.code} item md={6}>
                    <Box display="flex" justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                      <Typography variant="body2" color="grey.600">{filter.label}</Typography>
                      {
                        attributeValues.map((attribute: any) =>
                          filter.options.map((option: any) => (option.code === attribute &&
                            <Chip key={option.code} label={option.label} color={option.color} icon={option.icon && getMuiIcon(option.icon)} />
                          ))
                        )
                      }
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
