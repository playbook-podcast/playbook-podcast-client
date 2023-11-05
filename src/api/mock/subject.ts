import { EAudioStatus, ISubject, ISubjectListItem } from '../../types';

export const SUBJECT_MOCK: ISubject = {
  id: 1,
  timeToRead: Date.now(),
  timeToListen: Date.now(),
  title: 'The Future of Renewable Energy',
  introduction: {
    transcription: [
      {
        id: 0,
        end: 5200,
        text: ' Saint Text-to-Speech allows developers to create natural-sounding, synthetic human speech',
        start: 0,
      },
      {
        id: 1,
        end: 6760,
        text: ' as playable audio.',
        start: 5200,
      },
      {
        id: 2,
        end: 11820,
        text: ' You can use the audio data files you create using Text-to-Speech to power your applications',
        start: 6760,
      },
      {
        id: 3,
        end: 17440,
        text: ' or augment media like videos, or audio recordings, in compliance with the Google Cloud Platform',
        start: 11820,
      },
      {
        id: 4,
        end: 21000,
        text: ' Terms of Service including compliance with all applicable law.',
        start: 17440,
      },
    ],
    audioUrl:
      'https://45dfbd071387.ngrok.app//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBIQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b44eca07f95f76fc358d8c2f5f6b0504102aaece/24_1699161604.wav',
  },

  body: {
    transcription: [
      {
        id: 0,
        end: 5200,
        text: ' Saint Text-to-Speech allows developers to create natural-sounding, synthetic human speech',
        start: 0,
      },
      {
        id: 1,
        end: 6760,
        text: ' as playable audio.',
        start: 5200,
      },
      {
        id: 2,
        end: 11820,
        text: ' You can use the audio data files you create using Text-to-Speech to power your applications',
        start: 6760,
      },
      {
        id: 3,
        end: 17440,
        text: ' or augment media like videos, or audio recordings, in compliance with the Google Cloud Platform',
        start: 11820,
      },
      {
        id: 4,
        end: 21000,
        text: ' Terms of Service including compliance with all applicable law.',
        start: 17440,
      },
    ],
    audioUrl:
      'https://45dfbd071387.ngrok.app//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBIQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b44eca07f95f76fc358d8c2f5f6b0504102aaece/24_1699161604.wav',
  },
  summary: {
    transcription: [
      {
        id: 0,
        end: 5200,
        text: ' Saint Text-to-Speech allows developers to create natural-sounding, synthetic human speech',
        start: 0,
      },
      {
        id: 1,
        end: 6760,
        text: ' as playable audio.',
        start: 5200,
      },
      {
        id: 2,
        end: 11820,
        text: ' You can use the audio data files you create using Text-to-Speech to power your applications',
        start: 6760,
      },
      {
        id: 3,
        end: 17440,
        text: ' or augment media like videos, or audio recordings, in compliance with the Google Cloud Platform',
        start: 11820,
      },
      {
        id: 4,
        end: 21000,
        text: ' Terms of Service including compliance with all applicable law.',
        start: 17440,
      },
    ],
    audioUrl:
      'https://45dfbd071387.ngrok.app//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBIQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b44eca07f95f76fc358d8c2f5f6b0504102aaece/24_1699161604.wav',
  },
  audioStatus: EAudioStatus.DONE,
};

export const SUBJECTS_MOCK: ISubjectListItem[] = [
  {
    id: 1,
    title: 'The Future of Renewable Energy',
    audioStatus: EAudioStatus.PENDING,
    timeToRead: Date.now(),
    timeToListen: Date.now(),
  },
  {
    id: 2,
    title: 'Exploring the Deep Ocean',
    audioStatus: EAudioStatus.DONE,
    timeToRead: Date.now(),
    timeToListen: Date.now(),
  },
  {
    id: 3,
    title: 'Advances in Artificial Intelligence',
    audioStatus: EAudioStatus.DONE,
    timeToRead: Date.now(),
    timeToListen: Date.now(),
  },
  {
    id: 4,
    title: 'The Role of Diet in Longevity',
    audioStatus: EAudioStatus.DONE,
    timeToRead: Date.now(),
    timeToListen: Date.now(),
  },
  {
    id: 5,
    title: 'Smart Cities: The Intersection of Technology and Urban Planning',
    audioStatus: EAudioStatus.DONE,
    timeToRead: Date.now(),
    timeToListen: Date.now(),
  },
];
