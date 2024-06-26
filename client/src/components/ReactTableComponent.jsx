import React, { useEffect, useState } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { GlobalFilterComponent } from "./GlobalFilterComponent";

export default function ReactTableComponent() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Full Name",
        accessor: "full_name",
      },
      {
        Header: "E-mail",
        accessor: "mail",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Phone Number",
        accessor: "phone_number",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Bank Balance",
        accessor: "bank_balance",
      },
      {
        Header: "Credit Card",
        accessor: "credit_card",
        Cell: ({ value }) => (value ? "Yes" : "No"),
      },
      {
        Header: "Car Model",
        accessor: "car_model",
      },
      {
        Header: "Company",
        accessor: "company",
      },
      {
        Header: "Pricing",
        accessor: "pricing",
      },
    ],
    []
  );

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [globalFilter, setGFilter] = useState('');

  const fetchFilteredData = async (filter) => {
    console.log("fetchFilteredData is called")
    if (!filter) return;
    const res = await fetch(
      `http://localhost:4000/users/filter?search=${filter}`
    );
    const result = await res.json();
    setFilteredData(result);
    setPageCount(1);
    //need to se page Index as well
  };

  const fetchData = async ({ pageIndex, pageSize }) => {
    console.log("fetchData is called" , pageIndex,pageSize);
    const res = await fetch(
      `http://localhost:4000/users?page=${pageIndex}&limit=${pageSize}`
    );
    const result = await res.json();
    setData(result.data);
    setPageCount(Math.ceil(result.totalUsers / pageSize));
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state,
    setGlobalFilter,
    gotoPage,
    prepareRow,
  } = useTable(
    {
      columns,
      data:  globalFilter ? filteredData : data,
      manualPagination: true,
      pageCount,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  useEffect(() => {
    if (!globalFilter) {
      fetchData({ pageIndex, pageSize });
    } else {
      fetchFilteredData(globalFilter);
    }
  }, [pageIndex, pageSize, globalFilter]);

  // useEffect(() => {
  //   setGlobalFilter(globalFilter);
  // }, [globalFilter, setGlobalFilter]);

  return (
    <>
      <GlobalFilterComponent filter={globalFilter} setFilter={setGFilter} />
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="table-primary">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          Page {pageIndex + 1} of {pageCount}{" "}
        </span>
        <span>
          | Go to page{" "}
          <input
            type="number"
            value={pageIndex + 1}
            onChange={(e) => {
              const n = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(n);
            }}
          />
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={previousPage} disabled={!canPreviousPage}>
          Previous
        </button>{" "}
        <button onClick={nextPage} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </>
  );
}
