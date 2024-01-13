export const getPagingData = ({
  data,
  count,
  limit,
  skip,
}: {
  data: any;
  count: number;
  limit: number;
  skip: number;
}) => {
  const totalRecords = count;
  const items = data;
  const pageNumber = skip;
  const pageSize = limit ? +limit : 0;
  const totalPages = Math.ceil(totalRecords / limit);

  return { totalRecords, items, totalPages, pageNumber, pageSize };
};
