import React from "react";
import { useFilterContext } from '../context/Context'

//components
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import CircularProgressWithLabel from "./CircularProgressWithLabel"

//icons
import * as MUIcon from "@mui/icons-material"

const getMuiIcon = (icon) => {
  if (!icon) {
    return null
  }
  const Icon = icon && MUIcon[icon]
  return (Icon && <Icon />)
}

const RepositoryCard = (props) => {
  const { context } = useFilterContext()
  const { repository } = props;

  const filterLabels = [];

  for (const prop in repository.attributes) {
    const codeObj = context.allFilters.find(item => item.code === prop);
    if (codeObj && codeObj.label) {
      filterLabels.push(codeObj.label)
    }
  }

  // TODO: add logic to display the correct icon/text/component based on the repository's dynamic attributes
  return (
    <Card sx={{ position: "relative", maxWidth: 789 }} className="successCard">
      <Box pr={3} position="absolute" right={0} top='-3px'>
        <Chip label="Best Match" className="cardBadge" />
      </Box>
      <Box m={3} display="flex" gap={2.5}>
        <div>
          <CircularProgressWithLabel value={80} />
        </div>
        <Box display="flex" flexDirection="column" width={1}>
          <Box width='1'>
            <Link href={repository.url} target="_blank">
              <Typography variant="subtitle1" color="grey.800">{repository.label}</Typography>
            </Link>
          </Box>

          <Box display="flex" flexWrap='wrap' alignItems="center" gap={0.5} mt={0.5}>
            {
              filterLabels.map((row, index) => <Chip key={index} label={row} />)
            }
          </Box>
          <Box mt={2.5} gap={2.5} display="flex" width={1}>
            <Box width={1}>
              {
                context.allFilters
                  .filter((filter: any) => filter.label) // show only attributes of filters with a label
                  .map((filter: any) => {
                    const attributeValues = repository.attributes[filter.code]
                    if (!attributeValues) {
                      return null
                    }
                    return (
                      <Box key={filter.code} display="flex" justifyContent="space-between" pt={1} pb={1} borderBottom='1px solid rgba(0, 0, 0, 0.05)'>
                        <Typography key={filter.code} variant="body2" color="grey.600">{filter.label}</Typography>
                        {
                          attributeValues.map((attribute: any) =>
                            filter.options.map((option: any) => (option.code === attribute &&
                              <Chip key={option.code} label={option.label} color={option.color} icon={option.icon && getMuiIcon(option.icon)} />
                            ))
                          )
                        }
                      </Box>
                    )
                  })
              }
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}
export default RepositoryCard;
