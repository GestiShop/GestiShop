import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Alert, Box, Container, Grid } from '@mui/material';
import { connectDb } from '../db';
import logo from '../../assets/gestishop_logo.png';
import { Button } from './ui/forms';
import Settings from './settings-module/Settings';
import { FullScreenDialog } from './ui/FullscreenDialog';

const Home = (): ReactElement => {
  const { t } = useTranslation();
  const history = useHistory();
  const [text, setText] = useState<string>(t('home.loading'));
  const [error, setError] = useState<boolean>(false);
  const [openSettingsDialog, setOpenSettingsDialog] = useState<boolean>(false);

  const connectToTheDatabase = (): void => {
    setError(false);
    setText(t('home.loading'));

    connectDb()
      .then(() => {
        history.replace('/dashboard');

        return true;
      })
      .catch(() => {
        setError(true);
        setText(t('home.error'));

        return false;
      });
  };

  useEffect(() => {
    connectToTheDatabase();
  }, []);

  return (
    <Box>
      <Grid container id="loading-page--container">
        <Grid item xs={12}>
          <Container maxWidth="md">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  component="img"
                  sx={{ width: '100%' }}
                  src={logo}
                  alt="GestiShop"
                />
              </Grid>

              <Grid item xs={12}>
                <Alert severity={error ? 'error' : 'info'}>{text}</Alert>
              </Grid>

              {error && (
                <>
                  <Grid item xs={6}>
                    <Button
                      onClick={() => setOpenSettingsDialog(true)}
                      id="go-to-settings--btn"
                    >
                      {t('home.go_to_settings')}
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button onClick={connectToTheDatabase} id="retry--btn">
                      {t('home.retry')}
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Container>
        </Grid>
      </Grid>
      <FullScreenDialog
        open={openSettingsDialog}
        closeCallback={() => setOpenSettingsDialog(false)}
        title={t('settings.title')}
        childComponent={<Settings />}
      />
    </Box>
  );
};

export default Home;
