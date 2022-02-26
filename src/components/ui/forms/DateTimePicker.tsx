/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { useField } from 'formik';
import { TextFieldWrapper as TextField } from './TextField';

type Props = {
  name: string;
  required: boolean;
};

type DateTimePickerProps = {
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

export const DateTimePicker = ({
  name,
  required,
  ...otherProps
}: Props): ReactElement => {
  const [field, meta] = useField(name);

  const configDateTimePicker: DateTimePickerProps = {
    ...field,
    ...otherProps,
    name,
    required,
    label: '',
    type: 'datetime-local',
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
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return <TextField {...configDateTimePicker} />;
};
