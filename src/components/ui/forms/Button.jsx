/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from '@material-ui/core';

const ButtonWrapper = ({ children, color, ...otherProps }) => {
  const configButton = {
    ...otherProps,
    variant: 'contained',
    color: color || 'primary',
    fullWidth: true,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
