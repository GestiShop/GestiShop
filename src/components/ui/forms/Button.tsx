/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, ReactNode } from 'react';
import { Button } from '@mui/material';

type ButtonVariant = 'text' | 'contained' | 'outlined';

export type ButtonColor =
  | 'primary'
  | 'inherit'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning';

type Props = {
  children: ReactNode;
  color?: ButtonColor;
  className?: string;
};

type ButtonProps = {
  variant: ButtonVariant;
  color: ButtonColor;
  fullWidth: boolean;
  className: string;
};

export const ButtonWrapper = ({
  children,
  color = 'primary',
  className = '',
  ...otherProps
}: Props): ReactElement => {
  const configButton: ButtonProps = {
    ...otherProps,
    variant: 'contained',
    color,
    fullWidth: true,
    className: `m-auto br-20px ${className}`,
  };

  return <Button {...configButton}>{children}</Button>;
};

ButtonWrapper.defaultProps = {
  color: 'primary',
  className: '',
};
