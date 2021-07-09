/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { FC } from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';

interface Props {
  name: string;
}

const TextfieldWrapper: FC<Props> = ({ name, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    error: false,
    helperText: '',
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return <TextField variant="outlined" {...configTextfield} />;
};

export default TextfieldWrapper;
