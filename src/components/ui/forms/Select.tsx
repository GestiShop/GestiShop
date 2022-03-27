/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { useField, useFormikContext } from 'formik';

type OptionType<T> = {
  value: T;
  displayText: string;
};

type Props<T> = {
  name: string;
  label: string;
  options: Array<OptionType<T>>;
  onInput?: (arg0: T) => void;
  acceptNone?: boolean;
  required?: boolean;
};

type SelectProps<T> = {
  name: string;
  label: string;
  select: boolean;
  variant: 'outlined';
  fullWidth: boolean;
  onChange: (arg0: { target: { value: T } }) => void;
  InputLabelProps: {
    required: boolean;
  };
  error: boolean;
  helperText: string;
};

export const SelectWrapper = <T,>({
  name,
  label,
  options,
  onInput,
  acceptNone = false,
  required = false,
  ...otherProps
}: Props<T>): ReactElement => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event: { target: { value: T } }): void => {
    setFieldValue(name, event.target.value);
    if (onInput) {
      onInput(event.target.value);
    }
  };

  const configSelect: SelectProps<T> = {
    ...field,
    ...otherProps,
    label,
    name,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
    InputLabelProps: {
      required,
    },
    error: false,
    helperText: '',
  };

  if (meta?.touched && meta?.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {acceptNone && <MenuItem key={-1}>-</MenuItem>}

      {options.map((item, pos) => (
        <MenuItem key={pos} value={item.value}>
          {item.displayText}
        </MenuItem>
      ))}
    </TextField>
  );
};

SelectWrapper.defaultProps = {
  required: false,
  acceptNone: false,
  onInput: undefined,
};
