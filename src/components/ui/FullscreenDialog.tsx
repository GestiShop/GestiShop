/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, forwardRef, Ref } from 'react';
import {
  Box,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props<T> = {
  open: boolean;
  title: string;
  closeCallback: () => void;
  childComponent: ReactElement;
  initialState?: T;
};

export const FullScreenDialog = <T,>({
  open,
  title,
  closeCallback,
  childComponent,
  initialState = undefined,
}: Props<T>): ReactElement => {
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
      <AppBar sx={{ position: 'sticky' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeCallback}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: '1%' }} component="div">
        {componentToRender}
      </Box>
    </Dialog>
  );
};

FullScreenDialog.defaultProps = {
  initialState: undefined,
};
