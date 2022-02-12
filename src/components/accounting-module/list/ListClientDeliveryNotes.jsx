import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { Box } from '@mui/material';
import GenericListComponent from './GenericListComponent';
import {
  deleteClientDeliveryNotes,
  fetchClientDeliveryNotes,
} from '../../../db/ClientDeliveryNoteHelper';
import CreateClientDeliveryNote from '../create/CreateClientDeliveryNote';
import useIsMounted from '../../../utils/useIsMounted';
import deliveryNoteGenerator from '../../../utils/document-generator/deliveryNoteGenerator';

const ListClientDeliveryNotes = () => {
  const { t } = useTranslation();
  const componentRef = useRef();
  const [contentToPrint, setContentToPrint] = useState(null);
  const [shouldPrint, setShouldPrint] = useState(false);
  const [rows, setRows] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const isMounted = useIsMounted();
  const [currency, setCurrency] = useState(
    useSelector((store) => store.configuration.currencyInfo.currency.label)
  );

  const headers = [
    {
      id: 'deliveryNoteNumber',
      label: t(
        'accounting_module.delivery_note.structure.delivery_note_number'
      ),
      align: 'left',
      value: (row) =>
        `${row.deliveryNoteNumberPreamble}-${row.deliveryNoteNumber}`,
    },
    {
      id: 'name',
      label: t('accounting_module.delivery_note.structure.client_name'),
      align: 'left',
      parents: ['entityData', 'fiscalData'],
    },
    {
      id: 'pvp',
      label: t('accounting_module.delivery_note.structure.pvp', {
        currency,
      }),
      align: 'right',
      numeric: true,
    },
    {
      id: 'date',
      label: t('accounting_module.delivery_note.structure.date'),
      align: 'right',
    },
  ];

  const fetchData = () => {
    fetchClientDeliveryNotes(
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
    deleteClientDeliveryNotes(
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
    setContentToPrint(deliveryNoteGenerator(data));
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
          create: t('accounting_module.client_delivery_note.create'),
          title: t('accounting_module.client_delivery_note.list'),
          edit: t('accounting_module.client_delivery_note.edit'),
        }}
        creationComponent={<CreateClientDeliveryNote />}
      />
      <Box display="none" displayPrint="block" ref={componentRef}>
        {contentToPrint}
      </Box>
    </>
  );
};

export default ListClientDeliveryNotes;
