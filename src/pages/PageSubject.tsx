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
  const { transcription, text } = subjectSection;
  const hasTranscription = !!transcription;

  const handleToggle = () => toggleActiveSection(name);

  const isActive = (item: TranscriptionItemProps, playedMillis: number) =>
    playedMillis >= item.start && playedMillis < item.end;

  return (
    <Paper variant="outlined">
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          alignItems: 'center',
        }}
      >
        <Typography variant="h3" component="h2" textTransform="capitalize">
          {name}
        </Typography>
        <Box position="relative">
          <Tooltip title={hasTranscription ? 'Play audio' : 'Audio is not available'}>
            <span>
              <IconButton
                disabled={!hasTranscription}
                color={isModeActive ? 'default' : 'primary'}
                onClick={handleToggle}
              >
                {isModeActive ? <Cancel /> : <PlayCircle />}
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>
      <Box borderBottom={`1px solid ${grey[300]}`} />
      <SubjectTextContainer>
        {hasTranscription ? (
          transcription.map((item) => (
            <SubjectText
              key={item.id}
              component="span"
              onClick={() => onSubtextClick(item)}
              isActive={isActive(item, playedMilliseconds)}
              isRead={item.end <= playedMilliseconds}
            >
              {item.text}
            </SubjectText>
          ))
        ) : (
          <Typography component="span">{text}</Typography>
        )}
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
        setIsLoading(true);
        if (subjectId) {
          const fetchedSubject = await getSubject(subjectId);

          if (fetchedSubject) {
            setSubject(fetchedSubject);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const toggleActiveSection = (sectionName: ESubjectSections) => {
    const isSectionActive = sectionName === activeSection;
    const isAtEndOfSection = duration === playedMilliseconds;

    if (isSectionActive && isAtEndOfSection) {
      seekToTime(0);
      setActiveSection(null);
    } else {
      seekToTime(0);
      setActiveSection(isSectionActive ? null : sectionName);
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

      <Stack spacing={'8px'} mb={10}>
        {Object.values(ESubjectSections).map((section) =>
          subject?.[section]?.text ? (
            <SectionSubject
              key={section}
              name={section}
              isModeActive={activeSection === section}
              toggleActiveSection={() => toggleActiveSection(section)}
              subjectSection={subject[section]}
              onSubtextClick={handleSubtextClick}
              playedMilliseconds={playedMilliseconds}
            />
          ) : null,
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
