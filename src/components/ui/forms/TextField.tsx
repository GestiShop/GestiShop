/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';

type Props = {
  name: string;
  label: string;
  type?: string;
  onInput?: (arg0: string, arg1: string) => void;
  multiline?: boolean;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  id?: string;
};

type TextFieldVariant = 'outlined';

type TextFieldProps = {
  name: string;
  label: string;
  type: string;
  multiline: boolean;
  rows?: number;
  fullWidth: boolean;
  variant: TextFieldVariant;
  InputLabelProps: {
    required: boolean;
  };
  disabled: boolean;
  error: boolean;
  helperText: string;
  onChange: (arg0: { target: { name: string; value: string } }) => void;
};

export const TextFieldWrapper = ({
  name,
  label,
  onInput,
  type = 'text',
  multiline = false,
  rows = undefined,
  required = false,
  disabled = false,
  id,
  ...otherProps
}: Props): ReactElement => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event: {
    target: { name: string; value: string };
  }): void => {
    setFieldValue(name, event.target.value);
    onInput?.(event.target.name, event.target.value);
  };

  const configTextField: TextFieldProps = {
    ...field,
    ...otherProps,
    name,
    label,
    type,
    multiline,
    disabled,
    onChange: handleChange,
    fullWidth: true,
    variant: 'outlined',
    InputLabelProps: { required },
    error: false,
    helperText: '',
    ...(id && { id }),
    ...(rows && { rows }),
  };

  if (meta?.touched && meta?.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

TextFieldWrapper.defaultProps = {
  type: 'text',
  multiline: false,
  required: false,
  disabled: false,
  onInput: undefined,
  id: undefined,
};
