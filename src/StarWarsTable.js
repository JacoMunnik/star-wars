import React from 'react';
import styled from 'styled-components';
import { useTable, usePagination } from 'react-table';
import {
    useQuery,
    gql
  } from "@apollo/client";
  import { Link } from 'react-router-dom'
  import SpinnerLoader from './SpinnerLoaded';

 


const TableContainer = styled.div`
  padding: 1rem;

  table {
    border-spacing: 5;
    border: 0;
    color: yellow;
    box-shadow: 0 0px 0px 0;

    tr {
      :last-child {
        td {
          background-color: transparent;
          border-bottom: 0;
        }
      }
      background-color: transparent;
    }

    th,
    td {
      margin: 0;
      padding: 0.0rem;
      border-bottom: 0;
      border-right: 0;

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
  
`;


const columns = [
  {
    Header: 'Name',
    accessor: 'name',
    Cell: ({ cell }) => (
      <Link
            style={{ display: "block", margin: "1rem 0"}}
            to={`/PersonDetails/${cell.value}`}
            key={cell.value}
          >
            {cell.value}
          </Link>
      )
  },
  {
    Header: 'Height',
    accessor: 'height',
  },
  {
    Header: 'Mass',
    accessor: 'mass',
  },
  {
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: 'Homeworld',
    accessor: 'homeworld',
  },
  {
    Header: '',
    accessor: 'url',
    show: false,
  },
  ];

const initialState = {
  queryPageIndex: 1,
  queryPageSize: 10,
  totalCount: null,
};


const PAGE_CHANGED = 'PAGE_CHANGED';
const PAGE_SIZE_CHANGED = 'PAGE_SIZE_CHANGED';
const TOTAL_COUNT_CHANGED = 'TOTAL_COUNT_CHANGED';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case PAGE_CHANGED:
      return {
        ...state,
        queryPageIndex: payload,
      };
    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        queryPageSize: payload,
      };
    case TOTAL_COUNT_CHANGED:
      return {
        ...state,
        totalCount: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

function StarWarsTable() {
  const [{ queryPageIndex, queryPageSize }, dispatch] =
    React.useReducer(reducer, initialState);

  const { isLoading, error, data } = useQuery(gql`
    {
      people(page:${queryPageIndex+1}){
        count
        results {
          name
          height
          mass
          gender
          homeworld
          url
        }
      }
    }
  `);

  console.log(data)
  let isSuccess = false;

  if (data?.people?.results) {
      isSuccess = true;
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: isSuccess ? data.people.results : [],
      initialState: {
        pageIndex: queryPageIndex,
        pageSize: queryPageSize,
        hiddenColumns: columns
          .filter(col => col.show === false)
          .map(col => col.accessor)
      },
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: isSuccess ? Math.ceil(data.people.count / queryPageSize) : null,
    },
    usePagination
  );

  React.useEffect(() => {
    dispatch({ type: PAGE_CHANGED, payload: pageIndex });
  }, [pageIndex]);

  React.useEffect(() => {
    dispatch({ type: PAGE_SIZE_CHANGED, payload: pageSize });
    gotoPage(0);
  }, [pageSize, gotoPage]);

  React.useEffect(() => {
    if (data?.count) {
      dispatch({
        type: TOTAL_COUNT_CHANGED,
        payload: data.count,
      });
    }
  }, [data?.count]);

  if (error) {
    return <p>Error</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <TableContainer>
      {isSuccess ? (
        <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render('Header')}
                    </th>
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
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="pagination">
              {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage} className="pagination">
              {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage} className="pagination">
              {'>'}
            </button>{' '}
            <button className="pagination"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </button>{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Go to page:{' '}
              <input
                type="number"
                value={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                style={{ width: '100px' }}
              />
            </span>{' '}
            
          </div>
        </>
      ) : <div><SpinnerLoader/></div>}
    </TableContainer>
  );
}


export default StarWarsTable;
