import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { Box } from '@mui/material';
import GenericListComponent from './GenericListComponent';
import {
  deleteClientBills,
  fetchClientBills,
} from '../../../db/ClientBillHelper';
import CreateClientBill from '../create/CreateClientBill';
import billGenerator from '../../../utils/document-generator/billGenerator';

const ListClientBills = () => {
  const { t } = useTranslation();
  const componentRef = useRef();
  const [contentToPrint, setContentToPrint] = useState(null);
  const [shouldPrint, setShouldPrint] = useState(false);
  const [rows, setRows] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [currency, setCurrency] = useState(
    useSelector((store) => store.configuration.currencyInfo.currency.label)
  );

  const headers = [
    {
      id: 'billNumber',
      label: t('accounting_module.bill.structure.bill_number'),
      align: 'left',
      value: (row) => `${row.billNumberPreamble}-${row.billNumber}`,
    },
    {
      id: 'name',
      label: t('accounting_module.bill.structure.client_name'),
      align: 'left',
      parents: ['entityData', 'fiscalData'],
    },
    {
      id: 'pvp',
      label: t('accounting_module.bill.structure.pvp', {
        currency,
      }),
      align: 'right',
      numeric: true,
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
        setRows(data);
        setIsDataLoaded(true);
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

  const handleDelete = (ids) => {
    console.log('Delete rows:', ids);
    deleteData(ids);
  };

  const printHandler = useReactToPrint({
    content: () => componentRef.current,
    removeAfterPrint: true,
    suppressErrors: true,
  });

  const handlePrint = (data) => {
    setContentToPrint(billGenerator(data));
    setShouldPrint(true);
  };

  useEffect(() => {
    if (!shouldPrint) return;

    printHandler();
    setShouldPrint(false);
  }, [shouldPrint]);

  return (
    <>
      <GenericListComponent
        isDataLoaded={isDataLoaded}
        rows={rows}
        headers={headers}
        editCallback={handleEdit}
        deleteCallback={handleDelete}
        printCallback={handlePrint}
        texts={{
          create: t('accounting_module.client_bill.create'),
          title: t('accounting_module.client_bill.list'),
          edit: t('accounting_module.client_bill.edit'),
        }}
        creationComponent={<CreateClientBill />}
      />
      <Box display="none" displayPrint="block" ref={componentRef}>
        {contentToPrint}
      </Box>
    </>
  );
};

export default ListClientBills;
