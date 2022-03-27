/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';

type Props = {
  name: string;
  label: string;
  legend: string;
  onInput?: (arg0: string, arg1: boolean) => void;
};

export const CheckboxWrapper = ({
  name,
  label,
  legend,
  onInput,
}: Props): ReactElement => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event: {
    target: {
      name: string;
      checked: boolean;
    };
  }): void => {
    setFieldValue(name, event.target.checked);
    onInput?.(event.target.name, event.target.checked);
  };

  const configCheckbox = {
    ...field,
    onChange: handleChange,
  };

  const configFormControl = {
    error: false,
  };

  if (meta?.touched && meta?.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl {...configFormControl}>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...configCheckbox} />}
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
};

CheckboxWrapper.defaultProps = {
  onInput: undefined,
};
