import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreateTax from '../create/CreateTax';
import { deleteTaxes, fetchTaxes } from '../../../db/TaxHelper';
import GenericListComponent from './GenericListComponent';
import useIsMounted from '../../../utils/useIsMounted';

const ListTaxes = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const isMounted = useIsMounted();

  const headers = [
    {
      id: 'reference',
      label: t('accounting_module.tax.list.headers.reference'),
      align: 'left',
    },
    {
      id: 'percentage',
      label: t('accounting_module.tax.list.headers.percentage'),
      align: 'right',
    },
  ];

  const fetchData = () => {
    fetchTaxes(
      (error) => {
        console.log('error', error);
      },
      (data) => {
        if (isMounted.current) setRows(data);
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

  const handleSearch = (textToSearch) => {
    console.log('Searching text:', textToSearch);
  };

  const handleDelete = (ids) => {
    console.log('Delete rows:', ids);
    deleteData(ids);
  };

  return (
    <GenericListComponent
      rows={rows}
      headers={headers}
      editCallback={handleEdit}
      searchCallback={handleSearch}
      deleteCallback={handleDelete}
      texts={{
        create: t('accounting_module.tax.create'),
        title: t('accounting_module.tax.list.title'),
        edit: t('accounting_module.tax.edit'),
      }}
      creationComponent={<CreateTax />}
    />
  );
};

export default ListTaxes;
