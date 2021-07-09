import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreateTax from '../create/CreateTax';
import { fetchTaxes } from '../../../db/TaxHelper';
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
        create: t('accounting_module.tax.create'),
        title: t('accounting_module.tax.list.title'),
        edit: t('accounting_module.tax.edit'),
      }}
      creationComponent={<CreateTax />}
    />
  );
};

export default ListTaxes;
