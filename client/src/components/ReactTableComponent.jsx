import React, { Fragment, useEffect, useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { useSelector, useDispatch } from 'react-redux';
import { tableActions } from '../store/react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import './reactTable.css';
import LoadingIconComponent from './LoadingIconComponent/LoadingIconComponent';
import GlobalFilterComponent from './GlobalFilterComponent/GlobalFilterComponent';

export function ReactTableComponent() {
    const filter = useSelector((newState) => newState.globalfilter.filter);
    const filtereddData = useSelector((newState) => newState.globalfilter.data);
    const dispatch = useDispatch();
    const pageIndex = useSelector((newState) => newState.table.pageIndex);
    const pageCount = useSelector((newState) => newState.table.pageCount);
    const pageSize = useSelector((newState) => newState.table.pageSize);
    const data = useSelector((newState) => newState.table.data);
    const totalRecords = useSelector((newState) => newState.table.totalRecords)

    const columns = React.useMemo(
        () => [

            {
                Header: "First Name",
                accessor: "first_name"
            },
            {
                Header: "Last Name",
                accessor: "last_name"
            },
            {
                Header: "Age",
                accessor: "age"
            },
            {
                Header: "Mail",
                accessor: "email"
            },
            {
                Header: "Phone Number",
                accessor: "phone_number"
            },
            {
                Header: "Car",
                accessor: "car_make"
            },
            {
                Header: "Model",
                accessor: "car_model"
            },
            {
                Header: "Card",
                accessor: "card_type"
            },
            {
                Header: "Address",
                accessor: "address"
            },
            {
                Header: "City",
                accessor: "city"
            },
            {
                Header: "Country",
                accessor: "country"
            },
        ], []
    );

    const [loading, setLoading] = useState(false);

    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow } = useTable({
            columns,
            data: filter !== '' ? filtereddData : data,
            manualPagination: true,
            pageCount
        },
            usePagination
        );



    async function fetchData() {
        setLoading(true);
        await fetch(`http://localhost:3000/table?index=${pageIndex}&limit=${pageSize}`).then(result => {
            return result.json();
        }).then(res => {
            dispatch(tableActions.setData(res.data));
            dispatch(tableActions.setCount(res.pageCount));
            dispatch(tableActions.setTotalUsers(res.totalRecords));
            setLoading(false);
        }).catch(err => {
            console.error("Couldn't fetch data", err);
        });
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [pageIndex, pageSize])

    function handleButtons(newIndex) {
        dispatch(tableActions.setIndex(newIndex));
    }

    function handleDropdown(e) {
        const value = Number(e.target.value) || 10;
        dispatch(tableActions.setSize(value));
    }




    return (
        <Fragment>
            <div className='dropdown-filter'>
                <GlobalFilterComponent />

                <span className='dropdown'>
                    <div className='dropdownDiv'>
                        <label htmlFor="rDrop"> <strong>Select table size:</strong> </label>
                        <select name="recordsDropdown" id="rDrop" onChange={handleDropdown}>
                            <option value="10">10</option>
                            <option value="20" disabled={pageIndex + 1 >= totalRecords / 20}>20</option>
                            <option value="30" disabled={pageIndex + 1 >= totalRecords / 30}>30</option>
                            <option value="40" disabled={pageIndex + 1 >= totalRecords / 40}>40</option>
                            <option value="50" disabled={pageIndex + 1 >= totalRecords / 50}>50</option>
                        </select>
                    </div>

                </span>

            </div>


            <div className="reactTable">

                <table {...getTableProps()} className='table '>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id} className='table-primary'>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} key={column.id} >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>


                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} key={row.id}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} key={cell.column.id}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {filter == '' && (
                <Fragment>
                    {loading && <div className='loadingDiv'>
                        <LoadingIconComponent />
                    </div>}
                    <div className='container'>
                        <span className='searchSpan'>
                            Goto page{' '}
                            <input
                                type="number"
                                onChange={(e) => {
                                    const value = e.target.value > 0 ? e.target.value - 1 : 0;
                                    dispatch(tableActions.setIndex(value));
                                }}
                            />
                        </span>
                    </div>
                    <div className='container'>
                        <span className='btn-group'>
                            <button type='button' onClick={() => handleButtons(0)} disabled={pageIndex <= 0}>
                                <FontAwesomeIcon icon={faAnglesLeft} />
                            </button>
                            <button type='button' onClick={() => handleButtons(pageIndex - 1)} disabled={pageIndex <= 0}>
                                <FontAwesomeIcon icon={faArrowLeftLong} />
                            </button>
                            <p>{pageIndex + 1} of {pageCount}</p>
                            <button type='button' onClick={() => handleButtons(pageIndex + 1)} disabled={pageIndex >= pageCount - 1}>
                                <FontAwesomeIcon icon={faArrowRightLong} />
                            </button>
                            <button type='button' onClick={() => handleButtons(pageCount - 1)} disabled={pageIndex >= pageCount - 1}>
                                <FontAwesomeIcon icon={faAnglesRight} />
                            </button>
                        </span>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
}