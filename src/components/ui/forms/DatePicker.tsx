/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { useField } from 'formik';
import { TextFieldWrapper as TextField } from './TextField';

type Props = {
  name: string;
  required: boolean;
};

type DatePickerProps = {
  name: string;
  label: string;
  required: boolean;
  type: string;
  variant: string;
  fullWidth: boolean;
  InputLabelProps: {
    shrink: boolean;
    required: boolean;
  };
  error: boolean;
  helperText: string;
};

export const DatePicker = ({
  name,
  required,
  ...otherProps
}: Props): ReactElement => {
  const [field, meta] = useField(name);

  const configDatePicker: DatePickerProps = {
    ...field,
    ...otherProps,
    name,
    required,
    label: '',
    type: 'date',
    variant: 'outlined',
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
      required,
    },
    error: false,
    helperText: '',
  };

  if (meta?.touched && meta?.error) {
    configDatePicker.error = true;
    configDatePicker.helperText = meta.error;
  }

  return <TextField {...configDatePicker} />;
};
