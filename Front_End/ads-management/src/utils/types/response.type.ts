export type BaseResponse<T> = {
  data?: T;
  message: string;
  status: number;
};
