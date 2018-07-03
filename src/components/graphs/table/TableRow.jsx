import React from 'react';

const TableRow = ({ data, firstColHeader = false }) => {
  const cells = data.map((ele, index) => {
    if (firstColHeader && index === 1) {
      return (<th scope="row">{ele}</th>);
    }
    return (<td>{ele}</td>);
  });

  return (
    <tr className="RecordRow">
      {cells}
    </tr>
  );
};
 
export default TableRow;