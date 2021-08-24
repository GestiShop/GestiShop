import React from 'react';
import { Grid } from '@material-ui/core';
import { ProductsTable, SummaryTable } from './components/bill/BillTable';

const generateHeader = (data) => {
  return <div>Header</div>;
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
        {generateHeader(null)}
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
