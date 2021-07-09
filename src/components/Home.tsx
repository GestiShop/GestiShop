import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import connectDb from '../db/db';
import './Home.css';
import logo from '../../assets/gestishop_logo.png';

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    connectDb()
      .then(() => {
        history.replace('/dashboard');
        return true;
      })
      .catch(() => {
        return false;
      });
  }, [history]);

  return (
    <div className="float-center">
      <img className="logo" src={logo} alt="GestiShop" />
      <p>Starting, please wait...</p>
    </div>
  );
};

export default Home;
