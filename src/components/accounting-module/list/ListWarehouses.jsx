import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GenericListComponent from './GenericListComponent';
import { fetchWarehouses } from '../../../db/WarehouseHelper';
import CreateWarehouse from '../create/CreateWarehouse';

const ListWarehouses = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);

  const headers = [
    {
      id: 'reference',
      label: t('accounting_module.warehouse.list.headers.reference'),
      align: 'left',
    },
    {
      id: 'description',
      label: t('accounting_module.warehouse.list.headers.description'),
      align: 'left',
    },
  ];

  const fetchData = () => {
    fetchWarehouses(
      (error) => {
        console.log('error', error);
      },
      (data) => {
        setRows(data);
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = () => {
    fetchData();
  };

  const handleSearch = (textToSearch) => {
    console.log('Searching text:', textToSearch);
  };

  const handleDelete = (indexes) => {
    console.log('Delete rows:', indexes);
    fetchData();
  };

  return (
    <GenericListComponent
      rows={rows}
      headers={headers}
      editCallback={handleEdit}
      searchCallback={handleSearch}
      deleteCallback={handleDelete}
      texts={{
        create: t('accounting_module.warehouse.create'),
        title: t('accounting_module.warehouse.list.title'),
        edit: t('accounting_module.warehouse.edit'),
      }}
      creationComponent={<CreateWarehouse />}
    />
  );
};

export default ListWarehouses;
