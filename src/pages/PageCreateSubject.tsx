import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { createSubject } from '../api';
import { ERouting } from '../constants';
import { setIdToUrl } from '../helpers';

type SubjectFormData = {
  title: string;
  body: string;
};

export const PageCreateSubject = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<SubjectFormData>({ title: '', body: '' });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    void createSubject(formData)
      .then(({ id }) => {
        navigate(setIdToUrl(ERouting.SUBJECT, { subjectId: id }));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Create New Subject
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="body"
            label="Body"
            type="text"
            id="body"
            multiline
            rows={4}
            value={formData.body}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" sx={{ minWidth: '100px' }}>
            {isLoading ? (
              <CircularProgress sx={{ color: 'white' }} size={24} />
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
