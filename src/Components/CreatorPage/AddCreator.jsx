import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { useStyles } from "../styles/style";
import InputTextField from "./InputTextField";
import Header from '../Header/Header'
const AddCreator = inject("creatorStore")(
  observer(props => {
    const classes = useStyles();
    // const [state, setState] = useState({
    //   twitch: "",
    //   youtube: "",
    //   twitter: "",
    //   instagram: ""
    // });

    // const handleInput = ({ target }) => {
    //   const value = target.value;
    //   setState({
    //     ...state,
    //     [target.name]: value
    //   });
    // };

    const addClicked = () => {
      console.log(props);
    };

    const media = [
      { name: 'twitch', label: 'Twitch' },
      { name: 'instagram', label: 'Instagram' },
      { name: 'youtube', label: 'YouTube' },
      { name: 'twitter', label: 'Twitter' }
    ]
    
    return (
      <Paper elevation={0} style={{ width: "100vw", height: "100vh" }}>
        <Header page={"basic"} />
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item>
            <Typography variant="h6" align='center' style={{ marginTop: 30, paddingTop: 100, justifyContent: 'center' }}>
              SUGGEST NEW CREATOR
              </Typography>
            <br />
            <Typography variant="h8" color='secondary' align='center' style={{ marginTop: 30, paddingTop: 100 }}>
              Provide your favorite creator's username for...
              </Typography>
          </Grid>
          <form className={classes.rootLanding} noValidate autoComplete="off">
            <Grid item style={{ width: "60vw" }}>
              {media.map(m => <InputTextField name={m.name} label={m.label} />)}
            </Grid>
            <Grid item width={200}>
              <Button className={classes.buttonLanding} variant="contained" onClick={addClicked} color="secondary">
                SUBMIT
                </Button>
            </Grid>
          </form>
        </Grid>
      </Paper>
    );
  })
);
export default AddCreator;
