import { Api } from '../../constants';
import { APP_MODE } from '../../constants/app';
import { setIdToUrl } from '../../helpers';
import { EAppMode, ISubject } from '../../types';
import { axiosInstance } from '../http';
import { SUBJECT_MOCK } from '../mock';

export const getSubject = (id: string): Promise<ISubject> => {
  if (APP_MODE === EAppMode.DEVELOPMENT) {
    return new Promise<ISubject>((resolve) => resolve(SUBJECT_MOCK));
  }

  return axiosInstance.get(setIdToUrl(Api.SUBJECT_BY_ID, { id }));
};
