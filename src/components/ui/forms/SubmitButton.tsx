/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { FC } from 'react';
import { useFormikContext } from 'formik';
import Button from './Button';

interface Props {
  children: any;
}

const SubmitButtonWrapper: FC<Props> = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton = {
    ...otherProps,
    onClick: handleSubmit,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default SubmitButtonWrapper;
