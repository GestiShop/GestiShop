import React from 'react';
import Table from '../../ui/Table';

const Sales = () => {
  const headers = [
    {
      id: 'name',
      label: 'Name',
    },
    {
      id: 'count',
      label: 'Count',
    },
  ];

  const rows = [
    {
      name: 'Hola',
      count: '4',
    },
  ];

  return <Table headers={headers} rows={rows} title={'Test'} />;
};

export default Sales;
