import React from 'react'
import { observer, inject } from 'mobx-react'
import { Typography, Grid, Paper } from '@material-ui/core'
import LandingButton from '../Landing/LandingButton'
import { useLocation } from 'react-router-dom'

const NoResults = inject('userStore')(observer((props) => {
    const location = useLocation()

    return (
        <Paper style={{ width: '100vw', position: 'fixed' }}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                align="center"
                style={{ height: '100vh', width: '100wh' }}
            >
                <Grid item xs={10} sm={6} md={6} lg={6} style={{ height: '100vh', width: '100wh', justify: 'center', align: 'center' }}>
                    <Typography color='primary' style={{ fontSize: 60, paddingTop: 30 }}>
                        {
                            location.pathname === '/notifications'
                                ? <i class="fas fa-bell"></i>
                                : <i className="fas fa-user-plus"></i>
                        }
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {
                            location.pathname === '/notifications'
                                ? `Notifications`
                                : `No Results`
                        }
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {
                            location.pathname === '/notifications'
                                ? `Favorite creators to get notified about their latest livestreams, videos, and posts`
                                : `Help us improve your experience and suggest creators you would like to favorite`
                        }
                    </Typography>
                    {
                        location.pathname === '/notifications'
                            ? <LandingButton text={'EXPLORE'} to={"/explore"} />
                            : <LandingButton text={'SUGGEST CREATOR'} to={"/add/creator"} />
                    }
                </Grid>
            </Grid>
        </Paper>
    )
}))

export default NoResults