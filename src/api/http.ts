import axios from 'axios';

import { API_URL } from '../constants';

export const defaultConfigResponse = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
export const axiosInstance = axios.create({
  baseURL: API_URL,
});
