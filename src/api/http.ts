import axios from 'axios';
import { camelizeKeys } from 'humps';

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

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data) {
      try {
        response.data = camelizeKeys(response.data);
      } catch (e) {
        console.error('Could not parse response', e);
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
