import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, css, IconButton, Slider, styled, Typography } from '@mui/material';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import ReactPlayer from 'react-player';

import { BASE_SERVER_URL } from '../../constants';
import { convertMillisecondsToTime } from '../../helpers';

const PlayerContainer = styled(Box)(({ isVisible }: { isVisible: boolean }) => {
  return css`
    position: fixed;
    display: ${isVisible ? 'block' : 'none'};
    width: 600px;
    height: 42px;
    bottom: 24px;
    color: #9a9a9a;
    background-color: #1a1414;
    border-radius: 12px;
    padding: 0 14px;
    left: 50%;
    transform: translate(-50%, -50%);
  `;
});

const ControlsContainer = styled(Box)(() => {
  return css`
    display: flex;
    align-items: center;
    border-radius: 12px;
  `;
});

const PlayTimeContainer = styled(Box)(() => {
  return css`
    display: flex;
    align-items: center;
    border-radius: 12px;
    margin-left: 14px;
    flex-grow: 1;
  `;
});

const PlayTimeItem = styled(Typography)(() => {
  return css`
    margin: 0 14px;
    font-size: 14px;
  `;
});

const StyledSlider = styled(Slider)(() => {
  return css`
    color: #fff;

    & .MuiSlider-thumb {
      display: none;
    }
  `;
});

type AudioPlayerProps = {
  url: string;
  isVisible: boolean;
  playedMilliseconds: number;
  setPlayedMilliseconds: (milliseconds: number) => void;
  duration: number;
  setDuration: (duration: number) => void;
};

export const AudioPlayer = forwardRef(
  (
    {
      url,
      isVisible,
      playedMilliseconds,
      setPlayedMilliseconds,
      duration,
      setDuration,
    }: AudioPlayerProps,
    ref,
  ) => {
    const [playing, setPlaying] = useState(false);
    const reactPlayerRef = useRef<ReactPlayer>(null);

    const onDuration = (duration: number) => {
      setDuration(duration * 1000);
    };

    const onProgress = ({ playedSeconds }: { playedSeconds: number }) => {
      setPlayedMilliseconds(playedSeconds * 1000);
    };

    const togglePlayPause = () => {
      setPlaying(!playing);
    };

    useImperativeHandle(ref, () => ({
      seekTo: (seconds: number) => {
        if (reactPlayerRef.current) {
          reactPlayerRef.current.seekTo(seconds);
        }
      },
    }));

    useEffect(() => {
      if (!isVisible) {
        setPlaying(false);
      }
    }, [isVisible]);

    const durationTime = convertMillisecondsToTime(duration);
    const playedTime = convertMillisecondsToTime(playedMilliseconds);
    const audioUrl = BASE_SERVER_URL + url;

    return (
      <PlayerContainer isVisible={isVisible}>
        <ReactPlayer
          url={audioUrl}
          ref={reactPlayerRef}
          playing={playing}
          onDuration={onDuration}
          onProgress={onProgress}
          height="0"
          width="0"
        />
        <ControlsContainer>
          <IconButton sx={{ color: '#fff' }} onClick={togglePlayPause}>
            {playing ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>

          <PlayTimeContainer>
            <PlayTimeItem>{playedTime}</PlayTimeItem>

            <StyledSlider
              min={0}
              max={duration}
              value={playedMilliseconds}
              onChange={(_, value) => {
                const milliseconds = parseFloat(value.toString());
                if (reactPlayerRef.current) {
                  reactPlayerRef.current.seekTo(milliseconds / 1000);
                }
              }}
            />
            <PlayTimeItem>-{durationTime}</PlayTimeItem>
          </PlayTimeContainer>
        </ControlsContainer>
      </PlayerContainer>
    );
  },
);

AudioPlayer.displayName = 'AudioPlayer';
