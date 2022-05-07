/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, ReactNode } from 'react';
import { useFormikContext } from 'formik';
import { ButtonWrapper as Button } from './Button';

type Props = {
  children: ReactNode;
};

export const SubmitButtonWrapper = ({
  children,
  ...otherProps
}: Props): ReactElement => {
  const { submitForm } = useFormikContext();

  const handleSubmit = (): void => {
    submitForm();
  };

  const configButton = {
    ...otherProps,
    onClick: handleSubmit,
  };

  return (
    <Button id="submit--btn" {...configButton}>
      {children}
    </Button>
  );
};
