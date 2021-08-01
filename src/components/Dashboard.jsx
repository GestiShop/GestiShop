import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Button from './ui/forms/Button';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <Grid container spacing={2}>
              <Grid item xs={12} className="d-flex">
                <Button component={Link} to="/settings" replace>
                  {t('settings.title')}
                </Button>
              </Grid>
              <Grid item xs={12} className="d-flex">
                <Button component={Link} to="/accounting_module" replace>
                  {t('accounting_module.accounting_module')}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
