import React from 'react';
import { Grid } from '@material-ui/core';
import { Header, EntitiesTable } from './components/347model';

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

const generateBill = (providers, clients) => {
  return (
    <Grid container className="m-2r" spacing={3}>
      <Grid item xs={12}>
        {generateHeader()}
      </Grid>
      <Grid item xs={12}>
        {generateBody(providers, clients)}
      </Grid>
    </Grid>
  );
};

export default generateBill;
