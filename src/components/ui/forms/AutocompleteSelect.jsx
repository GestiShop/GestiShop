/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
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
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <Autocomplete
      includeInputInList
      autoComplete
      autoHighlight
      autoSelect
      options={options.sort(
        (a, b) =>
          -b.displayText[0]
            .toUpperCase()
            .localeCompare(a.displayText[0].toUpperCase())
      )}
      groupBy={(option) => option.displayText[0].toUpperCase()}
      getOptionLabel={(option) =>
        option && option.displayText ? option.displayText : ''
      }
      {...configSelect}
      renderInput={(params) => <TextField {...params} {...configTextField} />}
      onChange={handleChange}
    />
  );
};

export default AutocompleteSelectWrapper;
