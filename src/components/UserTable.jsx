import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable, useSortBy, usePagination } from 'react-table';

const UsersTable = ({ columns, data }) => {
  // Use the useTable hook to pass in the columns and data
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { pageIndex, pageSize },
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    pageOptions,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 }, // default pagination settings
    },
    useSortBy, // Adding sorting functionality
    usePagination // Adding pagination functionality
  );
  const navigate=useNavigate();
  const showProfile=(e)=>{
    console.log(e.allCells.filter((e)=>e.column.Header=="UserId")[0].value);
    let id=e.allCells.filter((e)=>e.column.Header=="UserId")[0].value;
    navigate(`/profile/${id}`)
  }

  return (
    <>
      <table {...getTableProps()} style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    border: '1px solid black',
                    padding: '8px',
                    cursor: column.isSorted ? 'pointer' : 'default',
                    backgroundColor: column.isSorted ? '#f1f1f1' : 'white',
                  }}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr onClick={(e)=>showProfile(row)} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{ border: '1px solid black', padding: '8px' }}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>

        <select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20].map(size => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default UsersTable;
