import { Box, Paper, Switch, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getSubject } from '../api';
import { ISubject } from '../types';

export const PageSubject = () => {
  const { subjectId } = useParams();

  const [subject, setSubject] = useState<ISubject | null>(null);

  const handleSwitchChange = () => {
    // switch mode
  };

  useEffect(() => {
    if (subjectId) {
      const fetchedSubject = getSubject(subjectId);

      setSubject(fetchedSubject);
    }
  }, []);

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box width="100%" display="flex" justifyContent="flex-end">
          <Switch onChange={handleSwitchChange} />
        </Box>
        <Typography variant="h4" component="h2" gutterBottom>
          {subject?.title}
        </Typography>
        <Typography>{subject?.body}</Typography>
      </Paper>
    </Box>
  );
};
