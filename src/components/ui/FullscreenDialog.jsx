/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Close as CloseIcon } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'sticky',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  contentContainer: {
    padding: '1%',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({
  open,
  closeCallback,
  title,
  childComponent,
  initialState,
}) => {
  const classes = useStyles();

  const componentToRender = React.cloneElement(childComponent, {
    initialState,
    closeCallback,
  });

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={closeCallback}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeCallback}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.contentContainer}>{componentToRender}</div>
    </Dialog>
  );
};

export default FullScreenDialog;
