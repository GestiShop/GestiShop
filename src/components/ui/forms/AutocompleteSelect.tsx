/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { TextField } from '@mui/material';
import { Autocomplete } from '@mui/lab';
import { useField, useFormikContext } from 'formik';

type OptionType<T> = {
  displayText: string;
  value: T | null;
};

type Props<T> = {
  name: string;
  label: string;
  required: boolean;
  acceptNone: boolean;
  onInput: (arg0: T | null) => void;
  options: Array<OptionType<T>>;
};

type TextFieldProps = {
  variant: 'outlined';
  fullWidth: boolean;
  label: string;
  InputLabelProps: {
    shrink: boolean;
    required: boolean;
  };
  error: boolean;
  helperText: string;
};

export const AutocompleteSelectWrapper = <T,>({
  name,
  label,
  options,
  onInput,
  required,
  acceptNone,
  ...otherProps
}: Props<T>): ReactElement => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (
    _event: never,
    newValue: OptionType<T> | Array<OptionType<T>> | null
  ): void => {
    if (Array.isArray(newValue)) {
      return;
    }

    setFieldValue(name, newValue);
    onInput?.(newValue?.value ?? null);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    includeInputInList: true,
    autoComplete: true,
    autoHighlight: true,
    autoSelect: true,
    groupBy: (option: OptionType<T>) => option.displayText.toUpperCase(),
    getOptionLabel: (option: OptionType<T>) => option.displayText ?? '',
    getOptionSelected: (option: OptionType<T>, value: OptionType<T>) =>
      option.value === value.value,
    onChange: handleChange,
  };

  const configTextField: TextFieldProps = {
    variant: 'outlined',
    fullWidth: true,
    label,
    InputLabelProps: {
      shrink: true,
      required,
    },
    error: false,
    helperText: '',
  };

  if (meta?.touched && meta?.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  const displayedOptions: Array<OptionType<T>> = options.sort(
    (a, b) =>
      -b.displayText.toUpperCase().localeCompare(a.displayText.toUpperCase())
  );

  if (acceptNone) {
    displayedOptions.unshift({
      displayText: '-',
      value: null,
    });
  }

  return (
    <Autocomplete
      {...configSelect}
      options={displayedOptions}
      renderInput={(params) => <TextField {...params} {...configTextField} />}
    />
  );
};
