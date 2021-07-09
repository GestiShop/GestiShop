/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useFormikContext } from 'formik';
import Button from './Button';

const SubmitButtonWrapper = ({ children, ...otherProps }) => {
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
