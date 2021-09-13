import React from 'react';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import { Header, MoneySummaryTable } from './components/303Model';

const generateHeader = () => {
  return <Header />;
};

const generateBody = (moneySummary) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MoneySummaryTable moneySummary={moneySummary} />
      </Grid>
    </Grid>
  );
};

const filterData = (entities) => {
  const calculateVATForBill = (bill) => {
    return bill.products
      .map(
        (product) =>
          product.basePricePerUnit *
          product.quantity *
          (1 - product.discountPercentage / 100) *
          (product.taxPercentage / 100)
      )
      .reduce((acc, vat) => acc + vat, 0);
  };

  return entities
    .map((entity) => ({
      trimester1: entity.bills
        .filter((bill) => moment(bill.date).month() < 3)
        .map(calculateVATForBill)
        .reduce((acc, bill) => acc + bill, 0),
      trimester2: entity.bills
        .filter(
          (bill) =>
            moment(bill.date).month() >= 3 && moment(bill.date).month() < 6
        )
        .map(calculateVATForBill)
        .reduce((acc, bill) => acc + bill, 0),
      trimester3: entity.bills
        .filter(
          (bill) =>
            moment(bill.date).month() >= 6 && moment(bill.date).month() < 9
        )
        .map(calculateVATForBill)
        .reduce((acc, bill) => acc + bill, 0),
      trimester4: entity.bills
        .filter((bill) => moment(bill.date).month() >= 9)
        .map(calculateVATForBill)
        .reduce((acc, bill) => acc + bill, 0),
    }))
    .map((entity) => ({
      ...entity,
      total:
        entity.trimester1 +
        entity.trimester2 +
        entity.trimester3 +
        entity.trimester4,
    }))
    .reduce(
      (acc, entity) => ({
        trimester1: entity.trimester1 + acc.trimester1,
        trimester2: entity.trimester2 + acc.trimester2,
        trimester3: entity.trimester3 + acc.trimester3,
        trimester4: entity.trimester4 + acc.trimester4,
        total: entity.total + acc.total,
      }),
      {
        trimester1: 0,
        trimester2: 0,
        trimester3: 0,
        trimester4: 0,
        total: 0,
      }
    );
};

const computeTotal = (input, output) => {
  return {
    trimester1: input.trimester1 - output.trimester1,
    trimester2: input.trimester2 - output.trimester2,
    trimester3: input.trimester3 - output.trimester3,
    trimester4: input.trimester4 - output.trimester4,
    total: input.total - output.total,
  };
};

const generateMoneySummary = (providers, clients) => {
  const moneySummary = [];

  moneySummary[0] = filterData(clients);
  moneySummary[1] = filterData(providers);
  moneySummary[2] = computeTotal(moneySummary[0], moneySummary[1]);

  return moneySummary;
};

const generate303Model = (providers, clients) => {
  const moneySummary = generateMoneySummary(providers, clients);

  return (
    <Grid container className="m-2r" spacing={3}>
      <Grid item xs={12}>
        {generateHeader()}
      </Grid>
      <Grid item xs={12}>
        {generateBody(moneySummary)}
      </Grid>
    </Grid>
  );
};

export default generate303Model;
