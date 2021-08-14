import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreateTax from '../create/CreateTax';
import { deleteTaxes, fetchTaxes } from '../../../db/TaxHelper';
import GenericListComponent from './GenericListComponent';
import useIsMounted from '../../../utils/useIsMounted';

const ListTaxes = () => {
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
    },
  ];

  const fetchData = () => {
    fetchTaxes(
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
    deleteTaxes(
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
