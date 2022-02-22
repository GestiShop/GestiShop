/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

type TextFieldVariant = 'outlined';

type TextFieldProps = {
  fullWidth: boolean;
  variant: TextFieldVariant;
  InputLabelProps: {
    required: boolean;
  };
  error: boolean;
  helperText: string;
};

type Props = {
  name: string;
  required: boolean;
};

const TextfieldWrapper = ({
  name,
  required,
  ...otherProps
}: Props): ReactElement => {
  const [field, meta] = useField(name);

  const configTextfield: TextFieldProps = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
    InputLabelProps: { required },
    error: false,
    helperText: '',
  };

  if (meta?.touched && meta?.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return <TextField {...configTextfield} />;
};

export default TextfieldWrapper;
