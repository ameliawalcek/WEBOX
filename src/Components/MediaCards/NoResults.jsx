import React from 'react'
import { observer, inject } from 'mobx-react'
import { Typography, Grid, Paper } from '@material-ui/core'
import LandingButton from '../Landing/LandingButton'

const EmptyCard = inject('userStore')(observer((props) => {

    return (
        <Paper>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                align="center"
                style={{ height: '100vh' }}
            >
                <Grid item xs={10} sm={6} md={6} lg={6}>
                    <Typography color='primary' style={{ fontSize: 60 }}>
                        <i className="fas fa-user-plus"></i>
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        No Results
                        </Typography>
                    <Typography variant="body2" gutterBottom>
                        Help us improve your experience and suggest creators you would like to favorite.
                        </Typography>
                    <LandingButton text={'SUGGEST CREATOR'} to={"/add/creator"} />
                </Grid>
            </Grid>
        </Paper>
    )
}))

export default EmptyCard