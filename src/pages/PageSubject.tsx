import { Article, Cancel, PlayCircle } from '@mui/icons-material';
import {
  Box,
  css,
  Paper,
  Stack,
  styled,
  Tooltip,
  Typography,
  TypographyProps,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';

import { getSubject } from '../api';
import { AudioPlayer, IconButton, Loader } from '../components';
import { EColorName } from '../constants/palette';
import {
  ESubjectSections,
  ISubject,
  SubjectSectionItem,
  TranscriptionItemProps,
} from '../types';

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
      transition: opacity 0.2s ease-in-out, color 0.2s ease-in-out;
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
  name,
  subjectSection,
  onSubtextClick,
  playedMilliseconds,
  toggleActiveSection,
  isModeActive,
}: {
  name: ESubjectSections;
  isModeActive: boolean;
  toggleActiveSection: (sectionName: ESubjectSections) => void;
  subjectSection: SubjectSectionItem;
  onSubtextClick: (props: TranscriptionItemProps) => void;
  playedMilliseconds: number;
}) => {
  const checkIsActive = (subjectBodyItem: TranscriptionItemProps) =>
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
        <Typography variant="h3" component="h2" textTransform="capitalize">
          {name}
        </Typography>
        <Box position={'relative'}>
          {isModeActive ? (
            <IconButton
              disabled={!subjectSection.transcription}
              onClick={() => toggleActiveSection(name)}
            >
              <Cancel />
            </IconButton>
          ) : (
            <Tooltip
              title={
                subjectSection.transcription ? 'Play audio' : 'Audio is not available'
              }
            >
              <span>
                <IconButton
                  disabled={!subjectSection.transcription}
                  color={'primary'}
                  onClick={() => toggleActiveSection(name)}
                >
                  <PlayCircle />
                </IconButton>
              </span>
            </Tooltip>
          )}
        </Box>
      </Box>
      <Box borderBottom={`1px solid ${grey['300']}`} />
      <SubjectTextContainer>
        {subjectSection.transcription
          ? subjectSection.transcription?.map((subjectBodyItem) =>
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
            )
          : subjectSection.text}
      </SubjectTextContainer>
    </Paper>
  );
};

export const PageSubject = () => {
  const { subjectId } = useParams();
  const audioPlayerRef = useRef<ReactPlayer>(null);

  const [playedMilliseconds, setPlayedMilliseconds] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<ESubjectSections | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true); // State to manage loading status

  const [subject, setSubject] = useState<ISubject | null>(null);

  const seekToTime = (time: number) => {
    if (typeof audioPlayerRef.current?.seekTo === 'function') {
      audioPlayerRef.current.seekTo(time / 1000);
    }
  };

  const handleSubtextClick = (subjectBodyItem: TranscriptionItemProps) => {
    seekToTime(subjectBodyItem.start);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching data
        if (subjectId) {
          const fetchedSubject = await getSubject(subjectId);

          if (fetchedSubject) {
            setSubject(fetchedSubject);
          }
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    getData();
  }, []);

  const toggleActiveSection = (sectionName: ESubjectSections) => {
    if (sectionName !== activeSection) {
      setActiveSection(sectionName);
      seekToTime(0);
    } else if (sectionName === activeSection && duration === playedMilliseconds) {
      seekToTime(0);
      setActiveSection(null);
    } else if (sectionName === activeSection) {
      setActiveSection(null);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <BackgroundAudioMode isActive={!!activeSection} />
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
        {subject?.[ESubjectSections.INTRODUCTION].text && (
          <SectionSubject
            isModeActive={activeSection === ESubjectSections.INTRODUCTION}
            name={ESubjectSections.INTRODUCTION}
            toggleActiveSection={toggleActiveSection}
            subjectSection={subject?.[ESubjectSections.INTRODUCTION]}
            onSubtextClick={handleSubtextClick}
            playedMilliseconds={playedMilliseconds}
          />
        )}

        {subject?.[ESubjectSections.BODY].text && (
          <SectionSubject
            name={ESubjectSections.BODY}
            isModeActive={activeSection === ESubjectSections.BODY}
            toggleActiveSection={toggleActiveSection}
            subjectSection={subject?.[ESubjectSections.BODY]}
            onSubtextClick={handleSubtextClick}
            playedMilliseconds={playedMilliseconds}
          />
        )}

        {subject?.[ESubjectSections.SUMMARY].text && (
          <SectionSubject
            name={ESubjectSections.SUMMARY}
            isModeActive={activeSection === ESubjectSections.SUMMARY}
            toggleActiveSection={toggleActiveSection}
            subjectSection={subject?.[ESubjectSections.SUMMARY]}
            onSubtextClick={handleSubtextClick}
            playedMilliseconds={playedMilliseconds}
          />
        )}
      </Stack>
      {activeSection && subject?.[activeSection]?.audioUrl && (
        <AudioPlayer
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          url={subject[activeSection].audioUrl}
          isVisible={!!activeSection}
          ref={audioPlayerRef}
          playedMilliseconds={playedMilliseconds}
          setDuration={setDuration}
          duration={duration}
          setPlayedMilliseconds={setPlayedMilliseconds}
        />
      )}
    </>
  );
};
