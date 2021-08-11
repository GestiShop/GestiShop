/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useField, useFormikContext } from 'formik';

const AutocompleteSelectWrapper = ({
  name,
  label,
  options,
  onInput,
  required,
  acceptNone,
  ...otherProps
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event, newValue) => {
    setFieldValue(name, newValue);
    if (onInput && newValue && newValue.value) {
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
    groupBy: (option) => option.displayText[0].toUpperCase(),
    getOptionLabel: (option) =>
      option && option.displayText ? option.displayText : '',
    getOptionSelected: (option, value) => option.value === value.value,
    onChange: handleChange,
  };

  const configTextField = {
    variant: 'outlined',
    fullWidth: true,
    label,
    InputLabelProps: {
      shrink: true,
      required,
    },
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <Autocomplete
      {...configSelect}
      options={options.sort(
        (a, b) =>
          -b.displayText[0]
            .toUpperCase()
            .localeCompare(a.displayText[0].toUpperCase())
      )}
      renderInput={(params) => <TextField {...params} {...configTextField} />}
    />
  );
};

export default AutocompleteSelectWrapper;
