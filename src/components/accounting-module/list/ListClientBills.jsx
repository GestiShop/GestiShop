import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
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
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const isMounted = useIsMounted();
  const [currency, setCurrency] = useState(
    useSelector((store) => store.configuration.currencyInfo.currency.label)
  );

  const headers = [
    {
      id: 'billNumber',
      label: t('accounting_module.bill.structure.bill_number'),
      align: 'left',
    },
    {
      id: 'entityData.fiscalData.name',
      label: t('accounting_module.bill.structure.client_name'),
      align: 'left',
    },
    {
      id: 'pvp',
      label: t('accounting_module.bill.structure.pvp', {
        currency,
      }),
      align: 'right',
    },
    {
      id: 'date',
      label: t('accounting_module.bill.structure.date'),
      align: 'right',
    },
    {
      id: 'isPaid',
      label: t('accounting_module.bill.structure.is_paid'),
      align: 'right',
    },
  ];

  const fetchData = () => {
    fetchClientBills(
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
      isDataLoaded={isDataLoaded}
      rows={rows}
      headers={headers}
      editCallback={handleEdit}
      searchCallback={handleSearch}
      deleteCallback={handleDelete}
      texts={{
        create: t('accounting_module.client_bill.create'),
        title: t('accounting_module.client_bill.list'),
        edit: t('accounting_module.client_bill.edit'),
      }}
      creationComponent={<CreateClientBill />}
    />
  );
};

export default ListClientBills;
