import { createStyles, Divider, Grid, makeStyles } from '@material-ui/core';
import React from 'react';

import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';

const useStyles = makeStyles(() =>
  createStyles({
    bold: {
      fontWeight: 'bold',
    },
  })
);

const ConfigSummary = () => {
  const { t } = useTranslation();

  const defaultConfig = useSelector((store: any) => store.configuration);

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={6}>
        <p className={classes.bold}>
          {t('settings.language_config.language')}:
        </p>
      </Grid>
      <Grid item xs={6}>
        <p>{defaultConfig.lang.label}</p>
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={6}>
        <p className={classes.bold}>
          {t('settings.currency_config.currency')}:
        </p>
      </Grid>
      <Grid item xs={6}>
        <p>{defaultConfig.currency.label}</p>
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={6}>
        <p className={classes.bold}>{t('settings.business_config.name')}:</p>
      </Grid>
      <Grid item xs={6}>
        <p>{defaultConfig.businessInfo.name}</p>
      </Grid>

      <Grid item xs={6}>
        <p className={classes.bold}>{t('settings.business_config.nif')}:</p>
      </Grid>
      <Grid item xs={6}>
        <p>{defaultConfig.businessInfo.nif}</p>
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={6}>
        <p className={classes.bold}>{t('settings.database_config.url')}:</p>
      </Grid>
      <Grid item xs={6}>
        <p>{defaultConfig.databaseInfo.url}</p>
      </Grid>

      <Grid item xs={6}>
        <p className={classes.bold}>{t('settings.database_config.port')}:</p>
      </Grid>
      <Grid item xs={6}>
        <p>{defaultConfig.databaseInfo.port}</p>
      </Grid>

      <Grid item xs={6}>
        <p className={classes.bold}>{t('settings.database_config.name')}:</p>
      </Grid>
      <Grid item xs={6}>
        <p>{defaultConfig.databaseInfo.name}</p>
      </Grid>

      <Grid item xs={6}>
        <p className={classes.bold}>{t('settings.database_config.user')}:</p>
      </Grid>
      <Grid item xs={6}>
        <p>{defaultConfig.databaseInfo.user}</p>
      </Grid>
    </Grid>
  );
};

export default ConfigSummary;
