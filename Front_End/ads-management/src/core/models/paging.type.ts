export type PagingREQ = { limit: number; skip: number };

export type PagingState = {
  limit?: number;
  skip?: number;
  total?: number;
};

export const initialPagingState: PagingState = {
  limit: 10,
  skip: 1,
};
