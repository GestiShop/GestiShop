import React from 'react';
import { Grid } from '@material-ui/core';
import { BudgetHeader, ProductsTable, SummaryTable } from './components/Budget';

const generateHeader = (
  budgetNumberPreamble,
  budgetNumber,
  date,
  clientData
) => {
  return (
    <BudgetHeader
      budgetNumberPreamble={budgetNumberPreamble}
      budgetNumber={budgetNumber}
      date={date}
      clientData={clientData}
    />
  );
};

const generateBody = (products) => {
  return <ProductsTable products={products} />;
};

const generateFooter = (products) => {
  return <SummaryTable products={products} />;
};

const generateBudget = (data) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {generateHeader(
          data.budgetNumberPreamble,
          data.budgetNumber,
          data.date,
          data.entityData.fiscalData
        )}
      </Grid>
      <Grid item xs={12}>
        {generateBody(data.products)}
      </Grid>
      <Grid item xs={12}>
        {generateFooter(data.products)}
      </Grid>
    </Grid>
  );
};

export default generateBudget;
