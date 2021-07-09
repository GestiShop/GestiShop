/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { FC } from 'react';
import { Button } from '@material-ui/core';

interface Props {
  children: any;
  component?: any;
  to?: string;
  className?: string;
}

const ButtonWrapper: FC<Props> = ({ children, ...otherProps }) => {
  return (
    <Button variant="contained" color="primary" fullWidth {...otherProps}>
      {children}
    </Button>
  );
};

export default ButtonWrapper;
