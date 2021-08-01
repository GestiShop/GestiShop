import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import GenericListComponent from './GenericListComponent';
import {
  deleteClientBills,
  fetchClientBills,
} from '../../../db/ClientBillHelper';
import CreateClientBill from '../create/CreateClientBill';
import useIsMounted from '../../../utils/useIsMounted';

const ListClientBills = () => {
  const { t } = useTranslation();
  const [rows, setRows] = useState([]);
  const isMounted = useIsMounted();

  const headers = [
    {
      id: 'reference',
      label: t('accounting_module.bill.structure.reference'),
      align: 'left',
    },
  ];

  const fetchData = () => {
    fetchClientBills(
      (error) => {
        console.log('error', error);
      },
      (data) => {
        if (isMounted.current) setRows(data);
      }
    );
  };

  const deleteData = (ids) => {
    deleteClientBills(
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
        create: t('accounting_module.bill.client.create'),
        title: t('accounting_module.bill.client.list'),
        edit: t('accounting_module.bill.client.edit'),
      }}
      creationComponent={<CreateClientBill />}
    />
  );
};

export default ListClientBills;
