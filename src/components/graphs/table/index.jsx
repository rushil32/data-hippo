import React from 'react';

import './index.css';
import TableRow from './TableRow';
import './table.css';
// import { getList } from '../helpers';

const Table = ({ headers, data }) => {
  const tableHeaders = headers.map(header => <th scope="col">{header}</th>);
  const rows = data.map((item, index) => <TableRow 
    key={index}
    data={data[index]}
    index={index}
  />);
  
  return (
    <table className="table Table">
      <thead>
        {tableHeaders}
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

export default Table;
