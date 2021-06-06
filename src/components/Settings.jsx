import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import ConfigLanguage from './settings-module/ConfigLanguage'
import ConfigCurrencyInfo from './settings-module/ConfigCurrencyInfo'
import ConfigBusinessInfo from './settings-module/ConfigBusinessInfo'
import ConfigDbInfo from './settings-module/ConfigDbInfo'
import ConfigUsers from './settings-module/ConfigUsers'
import ConfigInputMode from './settings-module/ConfigInputMode'
import ConfigModules from './settings-module/ConfigModules'
import ConfigAdvanced from './settings-module/ConfigAdvanced'

function TabPanel(props) {
    const {children, value, index, ...other} = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    )
}

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
}))

export default function Settings() {
    const {t} = useTranslation()

    const classes = useStyles()
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label={t('settings.language_config.language')} {...a11yProps(0)} />
                <Tab label={t('settings.currency_config.currency')} {...a11yProps(1)} />
                <Tab label={t('settings.business_config.business')} {...a11yProps(2)} />
                <Tab label={t('settings.database_config.database')} {...a11yProps(3)} />
                <Tab label={t('settings.users_config.users')} {...a11yProps(4)} />
                <Tab label={t('settings.input_mode_config.input_mode')} {...a11yProps(5)} />
                <Tab label={t('settings.modules_config.modules')} {...a11yProps(6)} />
                <Tab label={t('settings.advanced_config.advanced')} {...a11yProps(7)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <ConfigLanguage/>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <ConfigCurrencyInfo/>
            </TabPanel>

            <TabPanel value={value} index={2}>
                <ConfigBusinessInfo/>
            </TabPanel>

            <TabPanel value={value} index={3}>
                <ConfigDbInfo/>
            </TabPanel>

            <TabPanel value={value} index={4}>
                <ConfigUsers/>
            </TabPanel>

            <TabPanel value={value} index={5}>
                <ConfigInputMode/>
            </TabPanel>

            <TabPanel value={value} index={6}>
                <ConfigModules/>
            </TabPanel>

            <TabPanel value={value} index={7}>
                <ConfigAdvanced/>
            </TabPanel>
        </div>
    )
}