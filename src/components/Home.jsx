/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const classes = useStyles();

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
      });
  }, []);

  return (
    <div className={classes.floatCenter}>
      <img className={classes.logo} src={logo} alt="GestiShop" />
      <p>Starting, please wait...</p>
    </div>
  );
};

export default Home;
