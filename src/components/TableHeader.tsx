import React from 'react';

interface TableHeadersProps {
  numDays: number;
}

const TableHeaders: React.FC<TableHeadersProps> = ({ numDays }) => {
  const headers = Array.from({ length: numDays }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - 1 + index);
    return (
      <th key={index}>
        {date.toLocaleDateString('es-AR', {
          day: 'numeric',
          month: 'numeric',
        })}
      </th>
    );
  });

  return <>{headers}</>;
};

export default TableHeaders;
