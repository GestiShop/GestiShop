import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Types } from 'mongoose';
import CreateTax from '../create/CreateTax';
import { deleteTaxes, fetchTaxes } from '../../../db';
import GenericListComponent from './GenericListComponent';
import useIsMounted from '../../../utils/useIsMounted';
import { Tax } from '../../../model/types';

const ListTaxes = (): ReactElement => {
  const { t } = useTranslation();
  const [rows, setRows] = useState<Array<Tax>>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const isMounted = useIsMounted();

  const headers = [
    {
      id: 'reference',
      label: t('accounting_module.tax.structure.reference'),
      align: 'left',
    },
    {
      id: 'percentage',
      label: t('accounting_module.tax.structure.percentage'),
      align: 'right',
      numeric: true,
    },
  ];

  const fetchData = async (): Promise<void> => {
    const response = await fetchTaxes();
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
      isDataLoaded={isDataLoaded}
      rows={rows}
      headers={headers}
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
