/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';

type Props = {
  name: string;
  label: string;
  type?: string;
  onInput?: (arg0: string, arg1: string) => void;
  required?: boolean;
  disabled?: boolean;
  id?: string;
};

type TextFieldVariant = 'outlined';

type TextFieldProps = {
  name: string;
  label: string;
  type: string;
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
    disabled,
    onChange: handleChange,
    fullWidth: true,
    variant: 'outlined',
    InputLabelProps: { required },
    error: false,
    helperText: '',
    ...(id && { id }),
  };

  if (meta?.touched && meta?.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

TextFieldWrapper.defaultProps = {
  type: 'text',
  required: false,
  disabled: false,
  onInput: undefined,
  id: undefined,
};
