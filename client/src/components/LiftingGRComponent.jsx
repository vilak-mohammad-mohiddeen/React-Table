import React, { useState, useEffect, useCallback } from 'react';
import GlobalFilterComponent from './GlobalFilterComponent';
import ReactTableComponent from './ReactTableComponent';

export default function LiftingGRComponent() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const fetchData = useCallback(async ({ pageIndex, pageSize, filter }) => {
    const res = await fetch(`http://localhost:4000/users?page=${pageIndex}&limit=${pageSize}&search=${filter}`);
    const result = await res.json();
    setData(result.data);
    setPageCount(Math.ceil(result.totalUsers / pageSize));
  }, []);

  useEffect(() => {
    fetchData({ pageIndex, pageSize, filter });
  }, [pageIndex, pageSize, filter, fetchData]);

  return (
    <div>
      <GlobalFilterComponent filter={filter} setFilter={setFilter} />
      <ReactTableComponent
        data={data}
        pageCount={pageCount}
        fetchData={fetchData}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageSize={pageSize}
        setPageSize={setPageSize}
        globalFilter={filter}
        setGlobalFilter={setFilter}
      />
    </div>
  );
}
