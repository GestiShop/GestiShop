import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import { connectDb } from '../db/db';
import logo from '../../assets/gestishop_logo.png';

const useStyles = makeStyles(() => ({
  floatCenter: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '300px',
  },
}));

const Home = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  const [text, setText] = useState(t('home.loading'));

  useEffect(() => {
    console.log('Starting db connection');
    connectDb()
      .then(() => {
        console.log('Mongoose connected!');
        history.replace('/dashboard');
        return true;
      })
      .catch((err) => {
        console.log('Failed to connect to db', err);
        setText(t('home.error'));
      });
  }, []);

  return (
    <div className={classes.floatCenter}>
      <img className={classes.logo} src={logo} alt="GestiShop" />
      <p>{text}</p>
    </div>
  );
};

export default Home;
