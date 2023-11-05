import {
  Box,
  css,
  Paper,
  styled,
  Switch,
  Typography,
  TypographyProps,
} from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

import { getSubject } from '../api';
import { AudioPlayer } from '../components';
import { ISubject, SubjectBodyItemProps } from '../types';

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
  const audioPlayerRef = useRef<ReactPlayer>(null);

  const [isModeActive, setIsModeActive] = useState<boolean>(false);
  const [playedMilliseconds, setPlayedMilliseconds] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const [subject, setSubject] = useState<ISubject | null>(null);

  const handleSwitchChange = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    setIsModeActive(checked);
  };

  const seekToTime = (time: number) => {
    if (typeof audioPlayerRef.current?.seekTo === 'function') {
      audioPlayerRef.current.seekTo(time / 1000);
    }
  };

  const handleSubtextClick = (subjectBodyItem: SubjectBodyItemProps) => {
    seekToTime(subjectBodyItem.start);
  };

  useEffect(() => {
    if (subjectId) {
      const fetchedSubject = getSubject(subjectId);

      setSubject(fetchedSubject);
    }
  }, []);

  const checkIsActive = (subjectBodyItem: SubjectBodyItemProps) =>
    playedMilliseconds >= subjectBodyItem.start &&
    playedMilliseconds <= subjectBodyItem.end;

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
          {subject?.bodyParsed?.map((subjectBodyItem) =>
            isModeActive ? (
              <SubjectText
                component={'span'}
                onClick={() => handleSubtextClick(subjectBodyItem)}
                isActive={checkIsActive(subjectBodyItem)}
                isRead={subjectBodyItem.end < playedMilliseconds}
              >
                {subjectBodyItem.text}
              </SubjectText>
            ) : (
              <Typography component={'span'}>{subjectBodyItem.text}</Typography>
            ),
          )}
        </SubjectTextContainer>
      </Paper>
      {subject?.audioLink && (
        <AudioPlayer
          url={subject.audioLink}
          isVisible={isModeActive}
          ref={audioPlayerRef}
          playedMilliseconds={playedMilliseconds}
          setDuration={setDuration}
          duration={duration}
          setPlayedMilliseconds={setPlayedMilliseconds}
        />
      )}
    </Box>
  );
};
