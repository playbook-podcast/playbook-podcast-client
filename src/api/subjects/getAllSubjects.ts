import { Api } from '../../constants';
import { APP_MODE } from '../../constants/app';
import { EAppMode, ISubjectListItem } from '../../types';
import { axiosInstance, defaultConfigResponse } from '../http';
import { SUBJECTS_MOCK } from '../mock';

export const getAllSubjects = (): Promise<ISubjectListItem[]> => {
  if (APP_MODE === EAppMode.DEVELOPMENT) {
    return new Promise<ISubjectListItem[]>((resolve) => resolve(SUBJECTS_MOCK));
  }

  return axiosInstance.get(Api.SUBJECTS, defaultConfigResponse());
};
