export type BaseResponse<T> = {
  data?: T;
  message: string;
  status: number;
};

export type PagingResponse<T> = {
  data: {
    totalRecords: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    items: T[];
  };
  message: string;
  status: number;
};
