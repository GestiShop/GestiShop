import React from 'react';
import { Grid } from '@material-ui/core';
import BillTable from './components/bill/BillTable';

const generateHeader = (data) => {
  return <div>Header</div>;
};

const generateBody = (data) => {
  return (
    <div>
      <BillTable />
    </div>
  );
};

const generateFooter = (data) => {
  return <div>Footer</div>;
};

const generateBill = (data) => {
  return (
    <Grid container className="m-2r">
      <Grid item xs={12}>
        {generateHeader(null)}
      </Grid>
      <Grid item xs={12}>
        {generateBody(null)}
      </Grid>
      <Grid item xs={12}>
        {generateFooter(null)}
      </Grid>
    </Grid>
  );
};

export default generateBill;
