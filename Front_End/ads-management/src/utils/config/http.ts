import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import nProgress from 'nprogress';

const nProgressHandler = (type: 'start' | 'stop') => {
  if (typeof window !== 'object') return;
  if (type === 'start') nProgress.start();
  else nProgress.done();
};

export class BaseHTTP {
  public static _instance: BaseHTTP;
  public axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_API_ENDPOINT,
    });

    this.axios.interceptors.request.use(
      async (config: AxiosRequestConfig): Promise<any> => {
        nProgressHandler('start');
        return config;
      },
      (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
      },
    );

    this.axios.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        nProgressHandler('stop');
        return response;
      },
      (error: AxiosError): Promise<AxiosError> => {
        nProgressHandler('stop');
        return Promise.reject(error);
      },
    );
  }

  public static getInstance() {
    if (!BaseHTTP._instance) {
      BaseHTTP._instance = new BaseHTTP();
    }
    return BaseHTTP._instance;
  }

  public config(config: any) {
    const { accessToken } = config;
    BaseHTTP.getInstance().axios.interceptors.request.use(
      (request) => {
        request.headers.Authorization = `Bearer ${accessToken}`;
        return request;
      },
      (error) => {
        Promise.reject(error);
      },
    );
  }

  public setBaseUrlMap() {
    this.axios.defaults.baseURL = import.meta.env.VITE_MAP_API_ENDPOINT;
  }

  public static reset() {
    BaseHTTP._instance = new BaseHTTP();
  }
}

export const api = BaseHTTP.getInstance().axios;
