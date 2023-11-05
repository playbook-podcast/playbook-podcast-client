import { Api } from '../../constants';
import { setIdToUrl } from '../../helpers';
import { ISubject } from '../../types';
import { axiosInstance } from '../http';

export const getSubject = async (id: string): Promise<ISubject> => {
  return (await axiosInstance.get(setIdToUrl(Api.SUBJECT_BY_ID, { id }))).data;
};
