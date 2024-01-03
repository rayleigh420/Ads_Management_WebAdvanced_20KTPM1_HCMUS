export const getPagingData = ({ data, limit, skip }: { data: any; limit: number; skip: number }) => {
  const totalRecords = data[1];
  const items = data[0];
  const pageNumber = Math.ceil(skip / limit) + 1;
  const pageSize = limit ? +limit : 0;
  const totalPages = Math.ceil(totalRecords / limit);

  return { totalRecords, items, totalPages, pageNumber, pageSize };
};
