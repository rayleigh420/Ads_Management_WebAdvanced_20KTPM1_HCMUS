export type BaseResponse<T> = {
  statusCode: number;
  message: string;
  data: T; //error
};
