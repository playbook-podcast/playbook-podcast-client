import {
  Box,
  css,
  Paper,
  styled,
  Switch,
  Typography,
  TypographyProps,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getSubject } from '../api';
import { convertTimeStringToTimestamp } from '../helpers';
import { ISubject } from '../types';

const BackgroundAudioMode = styled(Box)(({ isActive }: { isActive: boolean }) => {
  return css`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #000;
    opacity: ${isActive ? 0.6 : 0};
    transition: opacity 0.3s ease-in-out;
    pointer-events: none;
  `;
});

const SubjectTextContainer = styled(Box)(() => {
  return css`
    span + span {
      padding-left: 4px;
    }
  `;
});

const SubjectText = styled(Typography)(
  ({ isActive, isRead }: TypographyProps & { isActive: boolean; isRead: boolean }) => {
    return css`
      color: ${isActive || isRead ? '#fff' : '#000'};
      opacity: ${isActive || !isRead ? 1 : 0.3};
      transition: opacity 0.3s ease-in-out, color 0.3s ease-in-out;
      cursor: pointer;
      position: relative;

      &:hover {
        color: #fff;
        opacity: 1;
      }
    `;
  },
);

export const PageSubject = () => {
  const { subjectId } = useParams();
  const [isModeActive, setIsModeActive] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  const [subject, setSubject] = useState<ISubject | null>(null);

  const handleSwitchChange = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    setIsModeActive(checked);
  };

  const activeFragment = subject?.bodyParsed?.find(({ id }) => id === activeId);
  const activeFragmentTimestamp = activeFragment?.start
    ? convertTimeStringToTimestamp(activeFragment?.start)
    : 0;

  useEffect(() => {
    if (subjectId) {
      void getSubject(subjectId).then((data) => {
        setSubject(data);
      });
    }
  }, []);

  return (
    <Box>
      <BackgroundAudioMode isActive={isModeActive} />
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box width="100%" display="flex" justifyContent="flex-end">
          <Switch checked={isModeActive} onChange={handleSwitchChange} />
        </Box>
        <Typography variant="h4" component="h2" gutterBottom>
          {subject?.title}
        </Typography>
        <SubjectTextContainer>
          {subject?.bodyParsed?.map(({ id, text, start }) =>
            isModeActive ? (
              <SubjectText
                key={`${id}/${text}/${start}`}
                component={'span'}
                onClick={() => setActiveId(id)}
                isActive={id === activeId}
                isRead={convertTimeStringToTimestamp(start) < activeFragmentTimestamp}
              >
                {text}
              </SubjectText>
            ) : (
              <Typography key={`${id}/${text}/${start}`} component={'span'}>
                {text}
              </Typography>
            ),
          )}
        </SubjectTextContainer>
      </Paper>
    </Box>
  );
};
