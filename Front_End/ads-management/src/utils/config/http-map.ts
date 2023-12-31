import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import nProgress from 'nprogress';

const nProgressHandler = (type: 'start' | 'stop') => {
  if (typeof window !== 'object') return;
  if (type === 'start') nProgress.start();
  else nProgress.done();
};

export class BaseHTTPMap {
  public static _instance: BaseHTTPMap;
  public axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_MAP_API_ENDPOINT,
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
    if (!BaseHTTPMap._instance) {
      BaseHTTPMap._instance = new BaseHTTPMap();
    }
    return BaseHTTPMap._instance;
  }

  public config(config: any) {
    const { accessToken } = config;
    BaseHTTPMap.getInstance().axios.interceptors.request.use(
      (request) => {
        request.headers.Authorization = `Bearer ${accessToken}`;
        return request;
      },
      (error) => {
        Promise.reject(error);
      },
    );
  }

  public static reset() {
    BaseHTTPMap._instance = new BaseHTTPMap();
  }
}

export const apiMap = BaseHTTPMap.getInstance().axios;
