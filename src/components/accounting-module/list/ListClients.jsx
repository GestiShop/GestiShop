import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import GenericListComponent from './GenericListComponent';
import { deleteClients, fetchClients } from '../../../db/ClientHelper';
import CreateClient from '../create/CreateClient';
import useIsMounted from '../../../utils/useIsMounted';

const ListClients = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const isMounted = useIsMounted();
  const currency = useSelector(
    (store) => store.configuration.currencyInfo.currency.label
  );

  const headers = [
    {
      id: 'reference',
      label: t('accounting_module.client.structure.reference'),
      align: 'left',
    },
    {
      id: 'name',
      label: t('accounting_module.client.structure.name'),
      align: 'left',
      parent: 'contactData',
    },
    {
      id: 'mainEmail',
      label: t('accounting_module.client.structure.main_email_email'),
      align: 'right',
      parent: 'contactData.email',
    },
    {
      id: 'mainPhone',
      label: t('accounting_module.client.structure.main_phone_phone'),
      align: 'right',
      parent: 'contactData.phone',
    },
  ];

  const fetchData = () => {
    fetchClients(
      (error) => {
        console.log('error', error);
      },
      (data) => {
        if (isMounted.current) setRows(data);
      }
    );
  };

  const deleteData = (ids) => {
    deleteClients(
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
        create: t('accounting_module.client.create'),
        title: t('accounting_module.client.list'),
        edit: t('accounting_module.client.edit'),
      }}
      creationComponent={<CreateClient />}
    />
  );
};

export default ListClients;
