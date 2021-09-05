/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { useField } from 'formik';
import TextField from './TextField';

const DatePicker = ({ name, required, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configDatePicker = {
    ...field,
    ...otherProps,
    type: 'date',
    variant: 'outlined',
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
      required,
    },
  };

  if (meta && meta.touched && meta.error) {
    configDatePicker.error = true;
    configDatePicker.helperText = meta.error;
  }

  return <TextField {...configDatePicker} required />;
};

export default DatePicker;
