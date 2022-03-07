import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Types } from 'mongoose';
import { GridColDef } from '@mui/x-data-grid';
import CreateTax from '../create/CreateTax';
import { deleteTaxes, fetchTaxes } from '../../../db';
import GenericListComponent from './GenericListComponent';
import useIsMounted from '../../../utils/useIsMounted';
import { Tax } from '../../../model';

const ListTaxes = (): ReactElement => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Array<Tax>>([]);
  const isMounted = useIsMounted();

  const columns: Array<GridColDef> = [
    {
      field: 'reference',
      headerName: t('accounting_module.tax.structure.reference'),
      flex: 1,
    },
    {
      field: 'percentage',
      headerName: t('accounting_module.tax.structure.percentage'),
      type: 'number',
      flex: 1,
    },
  ];

  const fetchData = async (): Promise<void> => {
    const response = await fetchTaxes();
    if (response.error !== null) {
      console.log(response.error);
    } else if (isMounted.current) {
      if (response.result !== null) {
        setRows(response.result);
      }
    }
  };

  const deleteData = async (ids: Array<Types.ObjectId>): Promise<void> => {
    await deleteTaxes(ids);
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
        create: t('accounting_module.tax.create'),
        title: t('accounting_module.tax.list'),
        edit: t('accounting_module.tax.edit'),
      }}
      creationComponent={<CreateTax />}
    />
  );
};

export default ListTaxes;
