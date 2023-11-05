import { BorderColor, Person } from '@mui/icons-material';
import { Box, Card, css, Stack, styled, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { getAllSubjects } from '../api';
import { EMOJIS_MOCK } from '../assets';
import { Button, Loader } from '../components';
import { ERouting } from '../constants';
import { EColorName } from '../constants/palette';
import { addEmojisToArray } from '../helpers';
import { ISubjectListItem } from '../types';

const StyledCard = styled(Card)(
  () => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    transition: background-color 0.3s ease-in-out;
    background-color: ${EColorName.WHITE};
    padding: 16px;

    .MuiBox-root {
      .css-171onha {
        transition: opacity 0.3s ease-in-out;
        opacity: 1;
      }

      .MuiButtonBase-root {
        transition: opacity 0.3s ease-in-out;
        opacity: 0;
      }
    }

    &:hover {
      background-color: ${grey['200']};

      .MuiBox-root {
        .css-171onha {
          opacity: 0;
        }

        .MuiButtonBase-root {
          opacity: 1;
        }
      }
    }
  `,
);

const CardSubjectAction = styled(Box)(
  () => css`
    position: relative;
  `,
);

const CardSubject = ({
  title,
  id,
  emoji,
  bodyAudioDuration,
  bodyEstimateReadingTime,
}: ISubjectListItem & { emoji: string }) => {
  return (
    <Link
      to={ERouting.SUBJECT.replace(':subjectId', id.toString())}
      style={{ textDecoration: 'none' }}
    >
      <StyledCard variant={'outlined'}>
        <Box display={'flex'} alignItems={'center'} gap={'16px'}>
          <Typography height={'20px'}>{emoji}</Typography>
          <Box>
            <Typography>{title}</Typography>
            <Typography variant={'body2'} color={'text.secondary'}>
              ~{bodyEstimateReadingTime} read | ~{bodyAudioDuration} listen
            </Typography>
          </Box>
        </Box>
        <CardSubjectAction>
          <Box display={'flex'} alignItems={'center'} gap={'4px'}>
            <Person />
            <Typography>Assigned to you</Typography>
          </Box>
          <Button
            variant={'contained'}
            sx={{ position: 'absolute', top: '-6px', right: '0' }}
          >
            Read
          </Button>
        </CardSubjectAction>
      </StyledCard>
    </Link>
  );
};

export const PageHome = () => {
  const [subjects, setSubjects] = useState<ISubjectListItem[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true); // State to manage loading status

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const fetchedSubject = await getAllSubjects();

        if (fetchedSubject) {
          setSubjects(fetchedSubject);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  console.log(subjects);

  const subjectsWithEmojis = addEmojisToArray(subjects, EMOJIS_MOCK);

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <Box mb={'24px'} display={'flex'} justifyContent={'space-between'}>
        <Typography component={'h1'} variant={'h1'}>
          Subject list
        </Typography>
        <Button
          onClick={() => navigate(ERouting.CREATE_SUBJECT)}
          variant={'contained'}
          startIcon={<BorderColor />}
        >
          Create subject
        </Button>
      </Box>

      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          {subjectsWithEmojis.length > 0 ? (
            <Stack spacing={'8px'}>
              {subjectsWithEmojis.map(({ id, ...restProps }) => (
                <CardSubject key={id} {...restProps} id={id} />
              ))}
            </Stack>
          ) : (
            <Typography>No subjects</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
