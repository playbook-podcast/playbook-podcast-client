import { Api } from '../../constants';
import { ISubjectListItem } from '../../types';
import { axiosInstance } from '../http';

export const getAllSubjects = async (): Promise<ISubjectListItem[]> => {
  return (await axiosInstance.get(Api.SUBJECTS)).data;
};
