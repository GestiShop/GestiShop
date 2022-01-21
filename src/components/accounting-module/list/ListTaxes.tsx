import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreateTax from '../create/CreateTax';
import { deleteTaxes, fetchTaxes } from '../../../db/helpers/tax-helper';
import GenericListComponent from './GenericListComponent';
import useIsMounted from '../../../utils/useIsMounted';
import { Types } from 'mongoose';

const ListTaxes = (): JSX.Element => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
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

  const fetchData = async () => {
    const response = await fetchTaxes();
    if (response.error !== null) {
      console.log(response.error);
    } else {
      if (isMounted.current) {
        setRows(response.result);
        setIsDataLoaded(true);
      }
    }
  };

  const deleteData = async (ids: Array<Types.ObjectId>) => {
    await deleteTaxes(ids);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = () => {
    fetchData();
  };

  const handleDelete = (ids: Array<Types.ObjectId>) => {
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
