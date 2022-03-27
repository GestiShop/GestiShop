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
  onClick: () => void;
  id?: string;
};

type ButtonProps = {
  variant: ButtonVariant;
  color: ButtonColor;
  fullWidth: boolean;
  className: string;
  onClick: () => void;
};

export const ButtonWrapper = ({
  children,
  color = 'primary',
  className = '',
  onClick,
  id,
  ...otherProps
}: Props): ReactElement => {
  const configButton: ButtonProps = {
    ...otherProps,
    variant: 'contained',
    color,
    onClick,
    fullWidth: true,
    className: `m-auto br-20px ${className}`,
    ...(id && { id }),
  };

  return <Button {...configButton}>{children}</Button>;
};

ButtonWrapper.defaultProps = {
  color: 'primary',
  className: '',
  id: undefined,
};
