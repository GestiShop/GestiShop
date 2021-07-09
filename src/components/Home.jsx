import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect as connectDb } from '../db/db';
import styles from './Home.css';
import logo from '../../assets/gestishop_logo.png';

const Home = () => {
  const history = useHistory();

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
  }, [history]);

  return (
    <div className={styles['float-center']}>
      <img className={styles.logo} src={logo} alt="GestiShop" />
      <p>Starting, please wait...</p>
    </div>
  );
};

export default Home;
