import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { connectDb } from '../db';
import logo from '../../assets/gestishop_logo.png';

const classes = {
  floatCenter: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '750px',
  },
};

const Home = (): ReactElement => {
  const { t } = useTranslation();
  const history = useHistory();
  const [text, setText] = useState(t('home.loading'));

  useEffect(() => {
    connectDb()
      .then(() => {
        history.replace('/dashboard');
        return true;
      })
      .catch(() => setText(t('home.error')));
  }, []);

  return (
    <Box sx={classes.floatCenter} id="loading-page--container">
      <Box component="img" sx={classes.logo} src={logo} alt="GestiShop" />
      <p>{text}</p>
    </Box>
  );
};

export default Home;
