import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GenericListComponent from './GenericListComponent';
import { deleteProviders, fetchProviders } from '../../../db/ProviderHelper';
import CreateProvider from '../create/CreateProvider';
import useIsMounted from '../../../utils/useIsMounted';

const ListProviders = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const isMounted = useIsMounted();

  const headers = [
    {
      id: 'reference',
      label: t('accounting_module.provider.structure.reference'),
      align: 'left',
    },
    {
      id: 'name',
      label: t('accounting_module.provider.structure.name'),
      align: 'left',
      parents: ['contactData'],
    },
    {
      id: 'email',
      label: t('accounting_module.provider.structure.main_email_email'),
      align: 'right',
      parents: ['contactData', 'email'],
    },
    {
      id: 'phone',
      label: t('accounting_module.provider.structure.main_phone_phone'),
      align: 'right',
      parents: ['contactData', 'phone'],
    },
  ];

  const fetchData = () => {
    fetchProviders(
      (error) => {
        console.log('error', error);
      },
      (data) => {
        if (isMounted.current) setRows(data);
      }
    );
  };

  const deleteData = (ids) => {
    deleteProviders(
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
        create: t('accounting_module.provider.create'),
        title: t('accounting_module.provider.list'),
        edit: t('accounting_module.provider.edit'),
      }}
      creationComponent={<CreateProvider />}
    />
  );
};

export default ListProviders;
