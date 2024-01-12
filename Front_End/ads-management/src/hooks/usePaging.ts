import { PagingREQ } from '@/apis/report/report.api';
import { removeEmptyParams } from '@/core/helpers/params.helper';
import { initialPagingState } from '@/core/models/paging.type';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export type PagingFilterType<T> = {
  initialPaging?: PagingREQ;
  initialFilter?: T;
};

export function usePaging<T extends object>({
  initialPaging = initialPagingState,
  initialFilter,
}: PagingFilterType<T>) {
  const [filter, setFilter] = useState<T & PagingREQ>({
    ...initialPaging,
    ...initialFilter,
  } as T & PagingREQ);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // when filter change, update url by new filter
  const handleFilterChange = (filter: T) => {
    setFilter((prev) => {
      const newFilter = { ...prev, ...filter, page: 1 };
      return newFilter;
    });
  };

  // when paging change, update url by new paging
  const handlePageChange = (paging: { page?: number; limit?: number }) => {
    const newParams = { ...filter, ...paging };
    setFilter(newParams);
  };

  useEffect(() => {
    navigate(`${pathname}?${queryString.stringify(removeEmptyParams<T & PagingREQ>(filter))}`);
  }, [filter]);

  return {
    filter,
    handleFilterChange,
    handlePageChange,
  };
}
