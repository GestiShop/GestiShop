import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { Box } from '@mui/material';
import GenericListComponent from './GenericListComponent';
import {
  deleteProviderBudgets,
  fetchProviderBudgets,
} from '../../../db/ProviderBudgetHelper';
import CreateProviderBudget from '../create/CreateProviderBudget';
import budgetGenerator from '../../../utils/document-generator/budgetGenerator';

const ListProviderBudgets = () => {
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
      id: 'budgetNumber',
      label: t('accounting_module.budget.structure.budget_number'),
      align: 'left',
      value: (row) => `${row.budgetNumberPreamble}-${row.budgetNumber}`,
    },
    {
      id: 'name',
      label: t('accounting_module.budget.structure.provider_name'),
      align: 'left',
      parents: ['entityData', 'fiscalData'],
    },
    {
      id: 'pvp',
      label: t('accounting_module.budget.structure.pvp', {
        currency,
      }),
      align: 'right',
      numeric: true,
    },
    {
      id: 'date',
      label: t('accounting_module.budget.structure.date'),
      align: 'right',
    },
  ];

  const fetchData = () => {
    fetchProviderBudgets(
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
    deleteProviderBudgets(
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
    setContentToPrint(budgetGenerator(data));
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
          create: t('accounting_module.provider_budget.create'),
          title: t('accounting_module.provider_budget.list'),
          edit: t('accounting_module.provider_budget.edit'),
        }}
        creationComponent={<CreateProviderBudget />}
      />
      <Box display="none" displayPrint="block" ref={componentRef}>
        {contentToPrint}
      </Box>
    </>
  );
};

export default ListProviderBudgets;
