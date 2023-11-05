import { Article, Cancel, PlayCircle } from '@mui/icons-material';
import {
  Box,
  css,
  Paper,
  Stack,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

import { getSubject } from '../api';
import { AudioPlayer, IconButton } from '../components';
import { EColorName } from '../constants/palette';
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
    padding: 16px;

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

const SectionSubject = ({
  title,
  subject,
  onSubtextClick,
  playedMilliseconds,
  isModeActive,
  setIsModeActive,
}: {
  title: string;
  isModeActive: boolean;
  setIsModeActive: Dispatch<SetStateAction<boolean>>;
  subject: ISubject | null;
  onSubtextClick: (props: SubjectBodyItemProps) => void;
  playedMilliseconds: number;
}) => {
  const checkIsActive = (subjectBodyItem: SubjectBodyItemProps) =>
    playedMilliseconds >= subjectBodyItem.start &&
    playedMilliseconds < subjectBodyItem.end;

  return (
    <Paper variant={'outlined'}>
      <Box
        width="100%"
        display={'flex'}
        justifyContent={'space-between'}
        p={'12px 16px'}
        alignItems={'center'}
      >
        <Typography variant="h3" component="h2">
          {title}
        </Typography>
        <Box position={'relative'}>
          {isModeActive ? (
            <IconButton onClick={() => setIsModeActive(false)}>
              <Cancel />
            </IconButton>
          ) : (
            <IconButton color={'primary'} onClick={() => setIsModeActive(true)}>
              <PlayCircle />
            </IconButton>
          )}
        </Box>
      </Box>
      <Box borderBottom={`1px solid ${grey['300']}`} />
      <SubjectTextContainer>
        {subject?.bodyParsed?.map((subjectBodyItem) =>
          isModeActive ? (
            <SubjectText
              component={'span'}
              onClick={() => onSubtextClick(subjectBodyItem)}
              isActive={checkIsActive(subjectBodyItem)}
              isRead={subjectBodyItem.end <= playedMilliseconds}
            >
              {subjectBodyItem.text}
            </SubjectText>
          ) : (
            <Typography component={'span'}>{subjectBodyItem.text}</Typography>
          ),
        )}
      </SubjectTextContainer>
    </Paper>
  );
};

export const PageSubject = () => {
  const { subjectId } = useParams();
  const audioPlayerRef = useRef<ReactPlayer>(null);

  const [isModeActive, setIsModeActive] = useState<boolean>(false);
  const [playedMilliseconds, setPlayedMilliseconds] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const [subject, setSubject] = useState<ISubject | null>(null);

  const seekToTime = (time: number) => {
    if (typeof audioPlayerRef.current?.seekTo === 'function') {
      audioPlayerRef.current.seekTo(time / 1000);
    }
  };

  const handleSubtextClick = (subjectBodyItem: SubjectBodyItemProps) => {
    seekToTime(subjectBodyItem.start);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (subjectId) {
          const fetchedSubject = await getSubject(subjectId);

          if (fetchedSubject) {
            setSubject(fetchedSubject);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <Box>
      <BackgroundAudioMode isActive={isModeActive} />

      <Box display={'flex'} gap={'8px'} mb={'30px'} alignItems={'center'}>
        <Box
          width={'40px'}
          height={'40px'}
          borderRadius={'8px'}
          border={`1px solid ${grey['300']}`}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{ backgroundColor: EColorName.WHITE }}
        >
          <Article />
        </Box>
        <Typography variant={'h2'} component={'h2'}>
          {subject?.title}
        </Typography>
      </Box>

      <Stack spacing={'8px'}>
        <SectionSubject
          title={'Introduction'}
          isModeActive={isModeActive}
          setIsModeActive={setIsModeActive}
          subject={subject}
          onSubtextClick={handleSubtextClick}
          playedMilliseconds={playedMilliseconds}
        />
        <SectionSubject
          // TODO: check the title
          title={'Development Process'}
          isModeActive={isModeActive}
          setIsModeActive={setIsModeActive}
          subject={subject}
          onSubtextClick={handleSubtextClick}
          playedMilliseconds={playedMilliseconds}
        />
        <SectionSubject
          title={'Summary'}
          isModeActive={isModeActive}
          setIsModeActive={setIsModeActive}
          subject={subject}
          onSubtextClick={handleSubtextClick}
          playedMilliseconds={playedMilliseconds}
        />
      </Stack>
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
