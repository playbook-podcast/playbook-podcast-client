import { EAudioStatus, ISubject } from '../../types';

export const SUBJECT_MOCK: ISubject = {
  id: 1,
  title: 'The Future of Renewable Energy',
  body: 'As the world increasingly seeks sustainable sources of energy, the future of renewable energy looks bright. With advances in solar technology, wind energy efficiencies, and the untapped potential of tidal and geothermal power, the landscape of energy production is rapidly changing. This article explores the innovations driving this transformation and what we might expect in the coming decades.',
  bodyParsed: [
    {
      id: 1,
      text: 'As the world',
      start: 0,
      end: 1000,
    },
    {
      id: 2,
      text: 'increasingly seeks',
      start: 1000,
      end: 2000,
    },
    {
      id: 3,
      text: 'sustainable sources',
      start: 2000,
      end: 3000,
    },
    {
      id: 4,
      text: 'of energy,',
      start: 3000,
      end: 4000,
    },
    {
      id: 5,
      text: 'the future',
      start: 4000,
      end: 5000,
    },
    {
      id: 6,
      text: 'looks bright.',
      start: 5000,
      end: 6000,
    },
    {
      id: 7,
      text: 'With advances',
      start: 6000,
      end: 7000,
    },
    {
      id: 8,
      text: 'in solar technology,',
      start: 7000,
      end: 8000,
    },
    {
      id: 9,
      text: 'wind energy',
      start: 8000,
      end: 9000,
    },
    {
      id: 10,
      text: 'efficiencies, and',
      start: 9000,
      end: 10000,
    },
    {
      id: 11,
      text: 'the untapped',
      start: 10000,
      end: 11000,
    },
    {
      id: 12,
      text: 'potential of tidal',
      start: 11000,
      end: 12000,
    },
    {
      id: 13,
      text: 'and geothermal',
      start: 12000,
      end: 13000,
    },
    {
      id: 14,
      text: 'power, the landscape',
      start: 13000,
      end: 14000,
    },
    {
      id: 15,
      text: 'of energy production',
      start: 14000,
      end: 15000,
    },
    {
      id: 16,
      text: 'is rapidly changing.',
      start: 15000,
      end: 16000,
    },
    {
      id: 17,
      text: 'This article',
      start: 16000,
      end: 17000,
    },
    {
      id: 18,
      text: 'explores the innovations',
      start: 17000,
      end: 18000,
    },
    {
      id: 19,
      text: 'driving this',
      start: 18000,
      end: 19000,
    },
    {
      id: 20,
      text: 'transformation and',
      start: 19000,
      end: 20000,
    },
    {
      id: 21,
      text: 'what we might',
      start: 20000,
      end: 21000,
    },
    {
      id: 22,
      text: 'expect in the',
      start: 21000,
      end: 22000,
    },
    {
      id: 23,
      text: 'coming decades.',
      start: 22000,
      end: 23000,
    },
  ],
  audioLink: 'https://dcs.megaphone.fm/NPR8535117753.mp3',
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
