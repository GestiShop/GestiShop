/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState, FC } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useField, useFormikContext } from 'formik';

interface Props {
  name: string;
  label: string;
  initialState: boolean;
  setValue: any;
}

const SwitchWrapper: FC<Props> = ({
  name,
  label,
  initialState,
  setValue,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [checked, setChecked] = useState(initialState);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
    setFieldValue(name, event.target.checked);
    if (setValue) {
      setValue(event.target.checked);
    }
  };

  const configSwitch = {
    ...field,
    ...otherProps,
    onChange: handleChange,
    error: false,
    helperText: '',
  };

  if (meta && meta.touched && meta.error) {
    configSwitch.error = true;
    configSwitch.helperText = meta.error;
  }

  return (
    <FormControlLabel
      control={<Switch color="primary" {...configSwitch} checked={checked} />}
      label={label}
    />
  );
};

export default SwitchWrapper;
