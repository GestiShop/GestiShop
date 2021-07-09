/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { FC } from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

interface Props {
  name: string;
}

const DateTimePicker: FC<Props> = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...otherProps,
    type: 'date',
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
    error: false,
    helperText: '',
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return <TextField variant="outlined" {...configDateTimePicker} />;
};

export default DateTimePicker;
