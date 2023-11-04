import { AudioStatus, ISubjectListItem } from '../../types';

export const getAllSubjects = (): ISubjectListItem[] => {
  return [
    {
      id: 1,
      title: 'The Future of Renewable Energy',
      audioStatus: AudioStatus.pending,
    },
    {
      id: 2,
      title: 'Exploring the Deep Ocean',
      audioStatus: AudioStatus.done,
    },
    {
      id: 3,
      title: 'Advances in Artificial Intelligence',
      audioStatus: AudioStatus.done,
    },
    {
      id: 4,
      title: 'The Role of Diet in Longevity',
      audioStatus: AudioStatus.done,
    },
    {
      id: 5,
      title: 'Smart Cities: The Intersection of Technology and Urban Planning',
      audioStatus: AudioStatus.done,
    },
  ];
};
