import React, { ReactElement } from 'react';
import { TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';

type BaseProps = {
  name: string;
  label: string;
  multiline?: boolean;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  id?: string;
};

type Props =
  | (BaseProps & {
      type?: 'number';
      onInput?: (eventName: string, eventValue: number) => void;
    })
  | (BaseProps & {
      type?: 'text' | 'password' | 'url' | 'email';
      onInput?: (eventName: string, eventValue: string) => void;
    });

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
  onChange: (event: { target: { name: string; value: string } }) => void;
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
    const newValue: number | string =
      type === 'number' //
        ? parseFloat(event.target.value)
        : event.target.value;

    setFieldValue(name, newValue);
    onInput?.(event.target.name, newValue as never);
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
