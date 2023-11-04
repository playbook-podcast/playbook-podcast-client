import { EAudioStatus, ISubjectListItem } from '../../types';

export const getAllSubjects = (): ISubjectListItem[] => {
  return [
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
};
