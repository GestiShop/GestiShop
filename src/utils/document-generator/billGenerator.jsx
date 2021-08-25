import React from 'react';
import { Grid } from '@material-ui/core';
import {
  BillHeader,
  ProductsTable,
  SummaryTable,
} from './components/bill/BillTable';

const generateHeader = (billNumberPreamble, billNumber, date, clientData) => {
  return (
    <BillHeader
      billNumberPreamble={billNumberPreamble}
      billNumber={billNumber}
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

const generateBill = (data) => {
  return (
    <Grid container className="m-2r" spacing={3}>
      <Grid item xs={12}>
        {generateHeader(
          data.billNumberPreamble,
          data.billNumber,
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

export default generateBill;
