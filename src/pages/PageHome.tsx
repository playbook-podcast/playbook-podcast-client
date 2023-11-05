import { Box, Card, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllSubjects } from '../api';
import { ERouting } from '../constants';
import { ISubjectListItem } from '../types';

const CardSubject = ({ title, id }: ISubjectListItem) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Link to={ERouting.SUBJECT.replace(':subjectId', id.toString())}>
      <Card
        elevation={isHovered ? 3 : 1}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box p={'24px 48px'}>
          <Typography>{title}</Typography>
        </Box>
      </Card>
    </Link>
  );
};

export const PageHome = () => {
  const [subjects, setSubjects] = useState<ISubjectListItem[]>([]);

  useEffect(() => {
    getAllSubjects().then(setSubjects);
  }, []);

  return (
    <>
      <Box mb={'64px'}>
        <Typography component={'h1'} variant={'h3'} textAlign={'center'}>
          Subjects
        </Typography>
      </Box>

      <Box maxWidth={750} mx={'auto'}>
        {subjects.length > 0 ? (
          <Stack spacing={4}>
            {subjects.map(({ id, ...restProps }) => (
              <CardSubject key={id} {...restProps} id={id} />
            ))}
          </Stack>
        ) : (
          <Typography>No subjects</Typography>
        )}
      </Box>
    </>
  );
};
