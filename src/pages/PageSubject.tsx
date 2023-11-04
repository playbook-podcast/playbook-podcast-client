import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

export const PageSubject = () => {
  const { subjectId } = useParams();

  return <Box>Subject page with id {subjectId}</Box>;
};
