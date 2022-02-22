/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { TextField } from '@mui/material';
import { Autocomplete } from '@mui/lab';
import { useField, useFormikContext } from 'formik';

type OptionType = {
  displayText: string;
  value: any;
};

type Props = {
  name: string;
  label: string;
  required: boolean;
  acceptNone: boolean;
  onInput: (arg0: OptionType) => void;
  options: Array<OptionType>;
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

const AutocompleteSelectWrapper = ({
  name,
  label,
  options,
  onInput,
  required,
  acceptNone,
  ...otherProps
}: Props): ReactElement => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (
    _event: any,
    newValue: OptionType | Array<OptionType> | null
  ): void => {
    if (Array.isArray(newValue)) {
      return;
    }

    setFieldValue(name, newValue);

    if (onInput && newValue?.value) {
      onInput(newValue.value);
    }
  };

  const configSelect = {
    ...field,
    ...otherProps,
    includeInputInList: true,
    autoComplete: true,
    autoHighlight: true,
    autoSelect: true,
    groupBy: (option: OptionType) => option.displayText.toUpperCase(),
    getOptionLabel: (option: OptionType) => option.displayText ?? '',
    getOptionSelected: (option: OptionType, value: OptionType) =>
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

  return (
    <Autocomplete
      {...configSelect}
      options={options.sort(
        (a, b) =>
          -b.displayText
            .toUpperCase()
            .localeCompare(a.displayText.toUpperCase())
      )}
      renderInput={(params) => <TextField {...params} {...configTextField} />}
    />
  );
};

export default AutocompleteSelectWrapper;
