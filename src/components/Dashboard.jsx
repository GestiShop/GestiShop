import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Button from './ui/forms/Button';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Grid container className="h-100 center-content">
      <Grid item xs={12}>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Grid item xs={12} className="d-flex">
              <Button component={Link} to="/accounting_module" replace>
                <FileCopyIcon className="m-2r font-3r" />
                {t('accounting_module.accounting_module')}
              </Button>
            </Grid>

            <Grid item xs={12} className="d-flex">
              <Button component={Link} to="/pos_module" replace>
                <AccountTreeIcon className="m-2r font-3r" />
                {t('pos_module.name')}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
