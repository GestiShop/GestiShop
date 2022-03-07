import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Types } from 'mongoose';
import { GridColDef } from '@mui/x-data-grid';
import GenericListComponent from './GenericListComponent';
import { deleteWarehouses, fetchWarehouses } from '../../../db';
import CreateWarehouse from '../create/CreateWarehouse';
import useIsMounted from '../../../utils/useIsMounted';
import { Warehouse } from '../../../model';

const ListWarehouses = (): ReactElement => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Array<Warehouse>>([]);
  const isMounted = useIsMounted();

  const columns: Array<GridColDef> = [
    {
      field: 'reference',
      headerName: t('accounting_module.warehouse.structure.reference'),
      flex: 1,
    },
    {
      field: 'description',
      headerName: t('accounting_module.warehouse.structure.description'),
      flex: 1,
    },
  ];

  const fetchData = async (): Promise<void> => {
    const response = await fetchWarehouses();
    if (response.error !== null) {
      console.log(response.error);
    } else if (isMounted.current) {
      if (response.result !== null) {
        setRows(response.result);
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
      rows={rows}
      columns={columns}
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
