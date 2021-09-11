import React from 'react';
import moment from 'moment';
import { Grid } from '@material-ui/core';
import { Header, EntitiesTable } from './components/347model';

const MIN_TOTAL = 3005.06;

const generateHeader = () => {
  return <Header />;
};

const generateBody = (providers, clients) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <EntitiesTable entities={providers} />
      </Grid>
      <Grid item xs={12}>
        <EntitiesTable entities={clients} isClient />
      </Grid>
    </Grid>
  );
};

const filterEntities = (entities_) => {
  const entities = entities_
    .map((entity) => ({
      id: entity.id,
      nif: entity.fiscalData.nif,
      name: entity.fiscalData.name,
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
    .filter((entity) => entity.total > MIN_TOTAL);

  return entities;
};

const generate347Model = (providers, clients) => {
  const filteredProviders = filterEntities(providers);
  const filteredClients = filterEntities(clients);

  return (
    <Grid container className="m-2r" spacing={3}>
      <Grid item xs={12}>
        {generateHeader()}
      </Grid>
      <Grid item xs={12}>
        {generateBody(filteredProviders, filteredClients)}
      </Grid>
    </Grid>
  );
};

export default generate347Model;
