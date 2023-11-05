import { Api } from '../../constants';
import { ISubject, PostSubject } from '../../types';
import { axiosInstance, defaultConfigResponse } from '../http';

export const createSubject = async (dto: PostSubject): Promise<ISubject> => {
  return (await axiosInstance.post(Api.SUBJECTS, dto, defaultConfigResponse())).data;
};
