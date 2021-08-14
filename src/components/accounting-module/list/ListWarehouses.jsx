import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GenericListComponent from './GenericListComponent';
import { deleteWarehouses, fetchWarehouses } from '../../../db/WarehouseHelper';
import CreateWarehouse from '../create/CreateWarehouse';
import useIsMounted from '../../../utils/useIsMounted';

const ListWarehouses = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const isMounted = useIsMounted();

  const headers = [
    {
      id: 'reference',
      label: t('accounting_module.warehouse.structure.reference'),
      align: 'left',
    },
    {
      id: 'description',
      label: t('accounting_module.warehouse.structure.description'),
      align: 'left',
    },
  ];

  const fetchData = () => {
    fetchWarehouses(
      (error) => {
        console.log('error', error);
      },
      (data) => {
        if (isMounted.current) {
          setRows(data);
          setIsDataLoaded(true);
        }
      }
    );
  };

  const deleteData = (ids) => {
    deleteWarehouses(
      ids,
      (error) => {
        console.log('error', error);
      },
      () => {
        fetchData();
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

  const handleDelete = (ids) => {
    console.log('Delete rows:', ids);
    deleteData(ids);
  };

  return (
    <GenericListComponent
      isDataLoaded={isDataLoaded}
      rows={rows}
      headers={headers}
      editCallback={handleEdit}
      searchCallback={handleSearch}
      deleteCallback={handleDelete}
      texts={{
        create: t('accounting_module.warehouse.create'),
        title: t('accounting_module.warehouse.list'),
        edit: t('accounting_module.warehouse.edit'),
      }}
      creationComponent={<CreateWarehouse />}
    />
  );
};

export default ListWarehouses;
