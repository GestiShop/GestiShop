/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { MenuItem, TextField } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';

const SelectWrapper = ({ name, options, onInput, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event) => {
    setFieldValue(name, event.target.value);
    if (onInput) {
      onInput(event);
    }
  };

  const configSelect = {
    ...field,
    ...otherProps,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      <MenuItem key={-1} value="">
        -
      </MenuItem>
      {options.map((item, pos) => {
        return (
          <MenuItem key={pos} value={item.value}>
            {item.displayText}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;
