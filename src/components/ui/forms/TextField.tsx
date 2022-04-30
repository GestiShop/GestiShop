/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';

type Props = {
  name: string;
  label: string;
  type?: 'number' | 'text';
  onInput?: <T>(eventName: string, eventValue: T) => void;
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
    switch (type) {
      case 'number': {
        const newValue: number = parseFloat(event.target.value);
        setFieldValue(name, newValue);
        onInput?.(event.target.name, newValue);
        break;
      }
      case 'text': {
        const newValue: string = event.target.value;
        setFieldValue(name, newValue);
        onInput?.(event.target.name, newValue);
        break;
      }
    }
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
