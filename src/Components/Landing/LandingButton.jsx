import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { useStyles } from "../styles/style";

function LandingButton(props) {
    const classes = useStyles()

    return (
        <Button
            button='true' component={RouterLink} to={props.to}
            className={classes.buttonLanding}
            variant='contained'
            color='primary'
        >
            {props.text}
        </Button>
    )
}

export default LandingButton