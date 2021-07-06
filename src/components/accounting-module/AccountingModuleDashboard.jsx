import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import { useTranslation } from 'react-i18next'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import CreateProduct from './create/CreateProduct'
import ListProducts from './list/ListProducts'
import ListTaxes from './list/ListTaxes'
import CreateTax from './create/CreateTax'
import ListUnitTypes from './list/ListUnitTypes'
import CreateUnitType from './create/CreateUnitType'

const DRAWER_WIDTH = 240

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: DRAWER_WIDTH,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}))

const AccountingModuleDashboard = () => {
    const {t} = useTranslation()

    const DRAWER_ITEMS = [
        {
            text: t('accounting_module.menu.products'),
            icon: <ShoppingBasketIcon/>,
            linkTo: '/list/products'
        },
        {
            text: t('accounting_module.menu.taxes'),
            icon: <AccountBalanceIcon/>,
            linkTo: '/list/taxes'
        },
        {
            text: t('accounting_module.menu.unit_types'),
            icon: <AccountBalanceIcon/>,
            linkTo: '/list/unit_types'
        }
    ]

    const classes = useStyles()
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {t('accounting_module.accounting_module')}
                    </Typography>
                </Toolbar>
            </AppBar>
            <BrowserRouter>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        {DRAWER_ITEMS.map((element) => (
                            <ListItem button key={element.text} component={Link} to={element.linkTo}>
                                <ListItemIcon>{element.icon}</ListItemIcon>
                                <ListItemText primary={element.text}/>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        <Route exact path="/" render={() => <div>Home Page</div>}/>

                        <Route path="/list/products" render={() => <ListProducts/>}/>
                        <Route path="/create/product" render={() => <CreateProduct/>}/>

                        <Route path="/list/taxes" render={() => <ListTaxes/>}/>
                        <Route path="/create/tax" render={() => <CreateTax/>}/>

                        <Route path="/list/unit_types" render={() => <ListUnitTypes/>}/>
                        <Route path="/create/unit_type" render={() => <CreateUnitType/>}/>
                    </Switch>
                </main>
            </BrowserRouter>
        </div>
    )
}

export default AccountingModuleDashboard
