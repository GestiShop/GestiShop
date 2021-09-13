import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

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
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
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
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
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
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  bottomPush: {
    position: 'fixed',
    bottom: 0,
    textAlign: 'center',
    paddingBottom: 10,
  },
}));

const DrawerLayout = ({ title, drawerItems, view }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
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
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {drawerItems.map((elementList, i) => {
            const itemList = elementList.map((element) => (
              <ListItem
                selected={selectedItem === element.text}
                button
                key={element.text}
                component={Link}
                to={element.href}
                replace
                onClick={() => setSelectedItem(element.text)}
              >
                <ListItemIcon>{element.icon}</ListItemIcon>
                <ListItemText primary={element.text} />
              </ListItem>
            ));

            if (i !== drawerItems.length - 1) {
              // TODO: fix key
              // eslint-disable-next-line react/no-array-index-key
              itemList.push(<Divider key={`elementlist-${i}`} />);
            }

            return itemList;
          })}
        </List>
        <div className={classes.bottomPush}>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
              <ArrowBackOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t('buttons.back')} />
          </ListItem>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {view}
      </main>
    </div>
  );
};

DrawerLayout.propTypes = {
  title: PropTypes.string.isRequired,
  drawerItems: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.exact({
        text: PropTypes.string.isRequired,
        icon: PropTypes.any.isRequired,
        href: PropTypes.string.isRequired,
      })
    )
  ).isRequired,
  view: PropTypes.element.isRequired,
};

export default DrawerLayout;
