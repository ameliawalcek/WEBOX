import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import { TextField, Button, Grid, Paper, Typography } from "@material-ui/core";
import { useStyles } from "../styles/style";
import InputTextField from "./InputTextField";

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

    return (
      <div>
        <Paper elevation={0} style={{ width: "100vw", height: "100vh" }}>
          <Grid container justify="center" alignItems="center" direction="column">
            <Grid item>
              <Typography variant="h4" style={{ marginTop: 30, paddingTop: 100 }}>
                ADD NEW CREATOR
              </Typography>
            </Grid>
            <form className={classes.rootLanding} noValidate autoComplete="off">
              <Grid item>
                <InputTextField name={"twitch"} label={"Twitch User Name"} />
              </Grid>
              <Grid item>
                <InputTextField name={"twitter"} label={"Twitter User Name"} />
              </Grid>
              <Grid item>
                <InputTextField name={"instagram"} label={"Instagram User Name"} />
              </Grid>
              <Grid item>
                <InputTextField name={"youtube"} label={"Youtube User Name"} />
              </Grid>
              <Grid item width={200}>
                <Button className={classes.buttonLanding} variant="contained" onClick={addClicked} color="secondary">
                  ADD
                </Button>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </div>
    );
  })
);
export default AddCreator;
