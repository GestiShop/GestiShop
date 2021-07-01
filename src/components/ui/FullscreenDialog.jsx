import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import CreateProduct from '../accounting-module/create/CreateProduct'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
})

const FullScreenDialog = ({open, closeCallback, title, childComponent}) => {
    const { t } = useTranslation()
    const classes = useStyles()

    const handleClose = (shouldCreate) => {
        if (shouldCreate) {
            // TODO: DO SOMETHING
        }
        closeCallback(shouldCreate)
    }

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => handleClose(false)} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <Button autoFocus color="inherit" onClick={() => handleClose(true)}>
                        {t('buttons.create')}
                    </Button>
                </Toolbar>
            </AppBar>
            {childComponent}
        </Dialog>
    )
}

export default FullScreenDialog