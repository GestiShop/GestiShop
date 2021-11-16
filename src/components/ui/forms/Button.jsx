/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { ReactElement } from 'react';
import { Button } from '@material-ui/core';

const ButtonWrapper = ({
  children,
  color = 'primary',
  className = '',
  ...otherProps
}): ReactElement => {
  const configButton = {
    ...otherProps,
    variant: 'contained',
    color,
    fullWidth: true,
    className: `m-auto br-20px ${className}`,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
