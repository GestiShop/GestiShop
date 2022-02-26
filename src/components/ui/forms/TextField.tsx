/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';

type Props = {
  name: string;
  label: string;
  type?: string;
  onInput?: (arg0: string) => void;
  required?: boolean;
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
  error: boolean;
  helperText: string;
  onChange: (arg0: { target: { value: string } }) => void;
};

export const TextFieldWrapper = ({
  name,
  label,
  onInput,
  type = 'text',
  required = false,
  ...otherProps
}: Props): ReactElement => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event: { target: { value: string } }): void => {
    setFieldValue(name, event.target.value);
    if (onInput) {
      onInput(event.target.value);
    }
  };

  const configTextField: TextFieldProps = {
    ...field,
    ...otherProps,
    name,
    label,
    type,
    onChange: handleChange,
    fullWidth: true,
    variant: 'outlined',
    InputLabelProps: { required },
    error: false,
    helperText: '',
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
  onInput: undefined,
};
