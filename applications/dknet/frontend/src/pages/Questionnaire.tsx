import React from 'react';

//components
import { Box } from '@mui/material';
import Container from '@mui/material/Container';

import withLayout from "../useLayout";
import FilteringAssistantLayout from "../components/Layouts/FilteringAssistant";

const QuestionnairePage = () => {
  return (
    <Container>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
      </Box>
    </Container>
  )
}
const QuestionnairePageWithLayout = withLayout(FilteringAssistantLayout)(QuestionnairePage);
export default QuestionnairePageWithLayout;
