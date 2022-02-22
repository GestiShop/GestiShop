/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useState } from 'react';
import { FormControlLabel, Switch } from '@mui/material';
import { useField, useFormikContext } from 'formik';

export type SwitchColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning';

type EventType = {
  target: {
    checked: boolean;
  };
};

type Props = {
  name: string;
  label: string;
  initialState: boolean;
  setValue: (arg0: boolean) => void;
};

type SwitchProps = {
  color: SwitchColor;
  onChange: (arg0: EventType) => void;
  error: boolean;
  helperText: string;
};

const SwitchWrapper = ({
  name,
  label,
  initialState,
  setValue,
  ...otherProps
}: Props): ReactElement => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [checked, setChecked] = useState(initialState);

  const handleChange = (event: EventType): void => {
    setChecked(event.target.checked);
    setFieldValue(name, event.target.checked);
    if (setValue) {
      setValue(event.target.checked);
    }
  };

  const configSwitch: SwitchProps = {
    ...field,
    ...otherProps,
    color: 'primary',
    onChange: handleChange,
    error: false,
    helperText: '',
  };

  if (meta?.touched && meta?.error) {
    configSwitch.error = true;
    configSwitch.helperText = meta.error;
  }

  return (
    <FormControlLabel
      control={<Switch {...configSwitch} checked={checked} />}
      label={label}
    />
  );
};

export default SwitchWrapper;
