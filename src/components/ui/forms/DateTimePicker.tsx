/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useField } from 'formik';
import TextField from './TextField';

type Props = {
  name: string;
  required: boolean;
};

type DateTimePickerProps = {
  name: string;
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

const DateTimePicker = ({
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

export default DateTimePicker;
