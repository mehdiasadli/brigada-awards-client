/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { env } from '../config/env.config';
import { AUTH_STORAGE_KEY, AuthStoreState } from '../stores/auth.store';
import { HttpError } from '../resources/HttpError';

const BASE = env.VITE_API_BASE;

export const create = (base: string, config?: Omit<CreateAxiosDefaults, 'baseURL'>) => {
  const instance = axios.create({
    baseURL: BASE + base,
    ...config,
  });

  instance.interceptors.request.use((config) => {
    const item = localStorage.getItem(AUTH_STORAGE_KEY);

    if (item === null) {
      return config;
    }

    const value = JSON.parse(item) as { state: AuthStoreState };

    if (!value.state.token) {
      return config;
    }

    config.headers.Authorization = `Bearer ${value.state.token}`;

    return config;
  });

  const request = async <T = any, D = any>(
    method: 'post' | 'put' | 'patch' | 'delete' | 'get',
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    try {
      const response = await instance.request<T>({
        url,
        method,
        data,
        ...config,
      });

      return response.data;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        if (HttpError.isHttpError(error.response?.data)) {
          throw new HttpError(error.response.data.message, error.response.data.status);
        }
      }

      throw new HttpError();
    }
  };

  return {
    get: <T>(url: string, config?: AxiosRequestConfig) => request<T>('get', url, undefined, config),
    delete: <T>(url: string, config?: AxiosRequestConfig) =>
      request<T>('delete', url, undefined, config),
    post: <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig) =>
      request<T, D>('post', url, data, config),
    put: <T, D = any>(url: string, data?: D, config?: AxiosRequestConfig) =>
      request<T, D>('put', url, data, config),
  };
};
