import { EAudioStatus, ISubject } from '../../types';

export const SUBJECT_MOCK: ISubject = {
  id: 1,
  title: 'The Future of Renewable Energy',
  body: 'As the world increasingly seeks sustainable sources of energy, the future of renewable energy looks bright. With advances in solar technology, wind energy efficiencies, and the untapped potential of tidal and geothermal power, the landscape of energy production is rapidly changing. This article explores the innovations driving this transformation and what we might expect in the coming decades.',
  bodyTranscription: [
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
  bodyAudioUrl:
    'https://45dfbd071387.ngrok.app//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBIQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b44eca07f95f76fc358d8c2f5f6b0504102aaece/24_1699161604.wav',
  summary:
    'Exploration of the advances and future potential of renewable energy sources such as solar, wind, tidal, and geothermal power.',
  audioStatus: EAudioStatus.DONE,
};

export const SUBJECTS_MOCK = [
  {
    id: 1,
    title: 'The Future of Renewable Energy',
    audioStatus: EAudioStatus.PENDING,
  },
  {
    id: 2,
    title: 'Exploring the Deep Ocean',
    audioStatus: EAudioStatus.DONE,
  },
  {
    id: 3,
    title: 'Advances in Artificial Intelligence',
    audioStatus: EAudioStatus.DONE,
  },
  {
    id: 4,
    title: 'The Role of Diet in Longevity',
    audioStatus: EAudioStatus.DONE,
  },
  {
    id: 5,
    title: 'Smart Cities: The Intersection of Technology and Urban Planning',
    audioStatus: EAudioStatus.DONE,
  },
];
