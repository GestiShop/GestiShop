import React from 'react';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import { Header, MoneySummaryTable } from './components/130Model';

const MIN_TOTAL = 3005.06;

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
  return entities
    .map((entity) => ({
      trimester1: entity.bills
        .filter((bill) => moment(bill.date).month() < 3)
        .map((bill) => bill.pvp)
        .reduce((acc, bill) => acc + bill, 0),
      trimester2: entity.bills
        .filter(
          (bill) =>
            moment(bill.date).month() >= 3 && moment(bill.date).month() < 6
        )
        .map((bill) => bill.pvp)
        .reduce((acc, bill) => acc + bill, 0),
      trimester3: entity.bills
        .filter(
          (bill) =>
            moment(bill.date).month() >= 6 && moment(bill.date).month() < 9
        )
        .map((bill) => bill.pvp)
        .reduce((acc, bill) => acc + bill, 0),
      trimester4: entity.bills
        .filter((bill) => moment(bill.date).month() >= 9)
        .map((bill) => bill.pvp)
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

const computeBenefits = (income, expenses) => {
  return {
    trimester1: income.trimester1 - expenses.trimester1,
    trimester2: income.trimester2 - expenses.trimester2,
    trimester3: income.trimester3 - expenses.trimester3,
    trimester4: income.trimester4 - expenses.trimester4,
    total: income.total - expenses.total,
  };
};

const generateMoneySummary = (providers, clients) => {
  const moneySummary = [];

  moneySummary[0] = filterData(clients);
  moneySummary[1] = filterData(providers);
  moneySummary[2] = computeBenefits(moneySummary[0], moneySummary[1]);

  return moneySummary;
};

const generate130Model = (providers, clients) => {
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

export default generate130Model;
