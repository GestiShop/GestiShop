import React from 'react';
import { Grid } from '@material-ui/core';
import {
  DeliveryNoteHeader,
  ProductsTable,
  SummaryTable,
} from './components/DeliveryNote';

const generateHeader = (
  deliveryNoteNumberPreamble,
  deliveryNoteNumber,
  date,
  clientData
) => {
  return (
    <DeliveryNoteHeader
      deliveryNoteNumberPreamble={deliveryNoteNumberPreamble}
      deliveryNoteNumber={deliveryNoteNumber}
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

const generateDeliveryNote = (data) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {generateHeader(
          data.deliveryNoteNumberPreamble,
          data.deliveryNoteNumber,
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

export default generateDeliveryNote;
