import { Api } from '../../constants';
import { APP_MODE } from '../../constants/app';
import { EAppMode, ISubject } from '../../types';
import { PostSubject } from '../../types/api';
import { axiosInstance, defaultConfigResponse } from '../http';
import { SUBJECT_MOCK } from '../mock';

export const createSubject = (dto: PostSubject): Promise<ISubject> => {
  if (APP_MODE === EAppMode.DEVELOPMENT) {
    return new Promise<ISubject>((resolve) => resolve(SUBJECT_MOCK));
  }

  return axiosInstance.post(Api.SUBJECTS, dto, defaultConfigResponse());
};
