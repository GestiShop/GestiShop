import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreateTax from '../create/CreateTax';
import { fetchTaxes } from '../../../db/TaxHelper';
import GenericListComponent from './GenericListComponent';

const ListTaxes = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);

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

  fetchTaxes(
    (error) => {
      console.log('error', error);
    },
    (data) => {
      setRows(data);
    }
  );

  const handleSearch = (textToSearch) => {
    console.log('Searching text:', textToSearch);
  };

  const handleEdit = (index) => {
    console.log('Edit row:', index);
  };

  const handleDelete = (indexes) => {
    console.log('Delete rows:', indexes);
  };

  return (
    <GenericListComponent
      rows={rows}
      headers={headers}
      searchCallback={handleSearch}
      editCallback={handleEdit}
      deleteCallback={handleDelete}
      texts={{
        create: t('accounting_module.tax.create'),
        title: t('accounting_module.tax.list.title'),
      }}
      creationComponent={<CreateTax />}
    />
  );
};

export default ListTaxes;
