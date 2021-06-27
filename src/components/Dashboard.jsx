import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid } from '@material-ui/core'
import Button from './ui/forms/Button'

const Dashboard = () => {
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Container maxWidth="md">
                        <Grid container spacing={2}>
                            <Grid item xs={12} className="d-flex">
                                <Button component={Link}
                                        to="/onboarding"
                                        className="m-auto">OnBoarding</Button>
                            </Grid>
                            <Grid item xs={12} className="d-flex">
                                <Button component={Link}
                                        to="/settings"
                                        className="m-auto">Settings</Button>
                            </Grid>
                            <Grid item xs={12} className="d-flex">
                                <Button component={Link}
                                        to="/accounting_module_dashboard"
                                        className="m-auto">Accounting Module</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard
