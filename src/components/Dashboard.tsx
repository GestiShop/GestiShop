import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FileCopy as FileCopyIcon } from '@mui/icons-material';
import { Button } from './ui/forms';

const Dashboard = (): ReactElement => {
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
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
