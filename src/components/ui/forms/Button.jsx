/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from '@material-ui/core';

const ButtonWrapper = ({ children, color, className, ...otherProps }) => {
  const configButton = {
    ...otherProps,
    variant: 'contained',
    color: color || 'primary',
    fullWidth: true,
    className: `m-auto br-20px ${className}`,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
