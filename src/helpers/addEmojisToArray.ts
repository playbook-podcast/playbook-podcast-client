import { ISubjectListItem } from '../types';

export const addEmojisToArray = (arr: ISubjectListItem[], images: string[]) => {
  return arr.map((element, index) => {
    const imageIndex = index % images.length; // This will cycle from 0 to 11
    return {
      ...element,
      emoji: images[imageIndex],
    };
  });
};
