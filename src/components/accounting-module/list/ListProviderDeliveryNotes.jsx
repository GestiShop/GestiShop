import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { Box } from '@mui/material';
import GenericListComponent from './GenericListComponent';
import {
  deleteProviderDeliveryNotes,
  fetchProviderDeliveryNotes,
} from '../../../db/ProviderDeliveryNoteHelper';
import CreateProviderDeliveryNote from '../create/CreateProviderDeliveryNote';
import deliveryNoteGenerator from '../../../utils/document-generator/deliveryNoteGenerator';

const ListProviderDeliveryNotes = () => {
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
      label: t('accounting_module.delivery_note.structure.provider_name'),
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
    fetchProviderDeliveryNotes(
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
    deleteProviderDeliveryNotes(
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
          create: t('accounting_module.provider_delivery_note.create'),
          title: t('accounting_module.provider_delivery_note.list'),
          edit: t('accounting_module.provider_delivery_note.edit'),
        }}
        creationComponent={<CreateProviderDeliveryNote />}
      />
      <Box display="none" displayPrint="block" ref={componentRef}>
        {contentToPrint}
      </Box>
    </>
  );
};

export default ListProviderDeliveryNotes;
