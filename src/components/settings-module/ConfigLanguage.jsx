import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { LANGUAGE_LIST } from '../../../assets/config/config';
import { setDefaultLang } from '../../redux/configuration';

export default function ConfigLanguage() {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const defaultLang = useSelector((store) => store.configuration.lang);

  const [lang, setLang] = React.useState(defaultLang);

  const handleChange = (event) => {
    const newLang = event.target.value;

    setLang(newLang);
    dispatch(setDefaultLang(newLang));
    i18n.changeLanguage(newLang.value);
  };

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="lang">
        {t('settings.language_config.language')}
      </InputLabel>
      <Select
        id="lang"
        value={lang}
        onChange={handleChange}
        label={t('settings.language_config.language')}
      >
        {LANGUAGE_LIST.map((item) => (
          <MenuItem key={item.value} value={item}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
