/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { useField, useFormikContext } from 'formik';
import { FormControl, InputLabel } from '@material-ui/core';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: () => null,
};

const MultiSelectWrapper = ({ name, label, options, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [value, setValue] = useState([]);

  const handleChange = (event) => {
    setValue(event.target.value);
    setFieldValue(name, event.target.value);
  };

  const labelId = `multi-select-label-${label}`;

  const configMultiSelect = {
    ...field,
    ...otherProps,
    labelId,
    label,
    multiple: true,
    MenuProps,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configMultiSelect.error = true;
    configMultiSelect.helperText = meta.error;
  }

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        {...configMultiSelect}
        value={value}
        renderValue={(selected) => selected.join(', ')}
      >
        {options.map((item, pos) => (
          <MenuItem key={pos} value={item}>
            <Checkbox checked={value.includes(item)} />
            <ListItemText primary={item} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectWrapper;
