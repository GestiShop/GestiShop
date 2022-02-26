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
};

export const CheckboxWrapper = ({
  name,
  label,
  legend,
}: Props): ReactElement => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event: {
    target: {
      checked: boolean;
    };
  }): void => {
    setFieldValue(name, event.target.checked);
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
