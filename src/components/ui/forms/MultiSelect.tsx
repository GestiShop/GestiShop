/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useState } from 'react';
import {
  MenuItem,
  ListItemText,
  Select,
  Checkbox,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';

type OptionType = {
  value: any;
  displayText: string;
};

type Props = {
  name: string;
  label: string;
  options: Array<OptionType>;
  initialValue: any;
};

type MultiSelectProps = {
  labelId: string;
  label: string;
  name: string;
  multiple: boolean;
  MenuProps: {
    PaperProps: {
      style: {
        maxHeight: number;
        width: number;
      };
    };
    getContentAnchorEl: () => null;
  };
  onChange: (arg0: { target: { value: any } }) => void;
  error: boolean;
  helperText: string;
};

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

const MultiSelectWrapper = ({
  name,
  label,
  options,
  initialValue,
  ...otherProps
}: Props): ReactElement => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: { target: { value: any } }): void => {
    setValue(event.target.value);
    setFieldValue(name, event.target.value);
  };

  const labelId = `multi-select-label-${label}`;

  const configMultiSelect: MultiSelectProps = {
    ...field,
    ...otherProps,
    labelId,
    label,
    name,
    multiple: true,
    MenuProps,
    onChange: handleChange,
    error: false,
    helperText: '',
  };

  if (meta?.touched && meta?.error) {
    configMultiSelect.error = true;
    configMultiSelect.helperText = meta.error;
  }

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        {...configMultiSelect}
        value={value}
        renderValue={(selected) =>
          options
            .filter((x) => selected.includes(x.value))
            .map((x) => x.displayText)
            .join(', ')
        }
      >
        {options.map((item, pos) => (
          <MenuItem key={pos} value={item.value}>
            <Checkbox checked={value.includes(item.value)} />
            <ListItemText primary={item.displayText} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectWrapper;
