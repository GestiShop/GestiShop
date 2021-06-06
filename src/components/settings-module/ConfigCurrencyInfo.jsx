import React from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'

import { CURRENCY_LIST, DECIMAL_MODES, FLOATING_POINT_OPTIONS } from '../../assets/config/config'

import { useDispatch, useSelector } from 'react-redux'
import { setDefaultCurrency, setDefaultDecimalMode, setDefaultFloatingPositions } from '../../redux/configuration'

import { useTranslation } from 'react-i18next'
import { FormControl, Grid, InputLabel, Select } from '@material-ui/core'


export default function ConfigCurrencyInfo() {
    const {t} = useTranslation()

    const dispatch = useDispatch()
    const defaultCurrency = useSelector(store => store.configuration.currencyInfo)

    const [state, setState] = React.useState(defaultCurrency)

    console.log(defaultCurrency)

    const handleChange = (event) => {
        const eventName = event.target.name
        const newValue = event.target.value

        setState({
            ...state,
            [eventName]: newValue
        })

        switch (eventName) {
            case 'currency':
                dispatch(setDefaultCurrency(newValue))
                break

            case 'decimalMode':
                dispatch(setDefaultDecimalMode(newValue))
                break

            case 'floatingPosition':
                dispatch(setDefaultFloatingPositions(newValue))
                break
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    name="currency"
                    select
                    label={t('settings.currency_config.currency')}
                    value={state.currency}
                    onChange={handleChange}
                    variant="outlined"
                >
                    {CURRENCY_LIST.map((option) => (
                        <MenuItem key={option.value} value={option}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={12}>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="decimalMode">{t('settings.currency_config.decimal_mode')}</InputLabel>
                    <Select
                        name="decimalMode"
                        id="decimalMode"
                        value={state.decimalMode}
                        onChange={handleChange}
                        label={t('settings.currency_config.decimal_mode')}
                    >
                        {DECIMAL_MODES.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <FormControl variant="outlined">
                    <InputLabel
                        htmlFor="floatingPosition">{t('settings.currency_config.floating_positions')}</InputLabel>
                    <Select
                        name="floatingPosition"
                        id="floatingPosition"
                        value={state.floatingPositions}
                        onChange={handleChange}
                        label={t('settings.currency_config.floating_positions')}
                    >
                        {FLOATING_POINT_OPTIONS.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}