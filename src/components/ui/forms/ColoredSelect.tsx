/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

type Props = {
  name: string;
  options: Array<string>;
};

type SelectProps = {
  name: string;
  select: boolean;
  variant: 'outlined';
  fullWidth: boolean;
  onChange: (arg0: { target: { value: string } }) => void;
  error: boolean;
  helperText: string;
};

const useStyles = makeStyles(() => ({
  dot: {
    height: '20px',
    width: '20px',
    marginRight: '10px',
    borderRadius: '50%',
    display: 'inline-block',
    border: '1px solid rgba(0, 0, 0, 0.5)',
  },
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}));

export const ColoredSelect = ({
  name,
  options,
  ...otherProps
}: Props): ReactElement => {
  const { t } = useTranslation();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const classes = useStyles();

  const handleChange = (event: { target: { value: string } }): void => {
    setFieldValue(name, event.target.value);
  };

  const configSelect: SelectProps = {
    ...field,
    ...otherProps,
    name,
    select: true,
    variant: 'outlined',
    fullWidth: true,
    onChange: handleChange,
    error: false,
    helperText: '',
  };

  if (meta?.touched && meta?.error) {
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
          <MenuItem key={pos} value={item}>
            <div className={classes.container}>
              <span
                className={classes.dot}
                style={{
                  backgroundColor: item,
                }}
              />
              {t(`accounting_module.event.colors.${item}`)}
            </div>
          </MenuItem>
        );
      })}
    </TextField>
  );
};
