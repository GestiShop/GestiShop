/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { MenuItem, TextField, makeStyles } from '@material-ui/core';
import { useField, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

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

const ColoredSelect = ({ name, options, ...otherProps }) => {
  const { t } = useTranslation();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const classes = useStyles();

  const handleChange = (event) => {
    setFieldValue(name, event.target.value);
  };

  const configSelect = {
    acceptNone: true,
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

export default ColoredSelect;
