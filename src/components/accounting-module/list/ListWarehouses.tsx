import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Types } from 'mongoose';
import GenericListComponent from './GenericListComponent';
import { deleteWarehouses, fetchWarehouses } from '../../../db';
import CreateWarehouse from '../create/CreateWarehouse';
import useIsMounted from '../../../utils/useIsMounted';
import { Warehouse } from '../../../model';

const ListWarehouses = (): ReactElement => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Array<Warehouse>>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
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

  const fetchData = async (): Promise<void> => {
    const response = await fetchWarehouses();
    if (response.error !== null) {
      console.log(response.error);
    } else if (isMounted.current) {
      if (response.result !== null) {
        setRows(response.result);
        setIsDataLoaded(true);
      }
    }
  };

  const deleteData = async (ids: Array<Types.ObjectId>): Promise<void> => {
    await deleteWarehouses(ids);
    fetchData();
  };

  useEffect((): void => {
    fetchData();
  }, []);

  const handleEdit = (): void => {
    fetchData();
  };

  const handleDelete = (ids: Array<Types.ObjectId>): void => {
    deleteData(ids);
  };

  return (
    <GenericListComponent
      isDataLoaded={isDataLoaded}
      rows={rows}
      headers={headers}
      editCallback={handleEdit}
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
