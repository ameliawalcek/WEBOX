import React, { useState } from 'react'
import { observer, inject } from 'mobx-react'
import { makeStyles, TextField, Button, Grid, Paper, Typography } from '@material-ui/core'
import Header from '../Header/Header'
import { useLocation, Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10,
    width: '80%',
    overflow: 'hidden',
    padding: 10,
  },
  input: {
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
  },
  button: {
    width: 200,
    height: 40,
    margin: 15,
  },
}));

const Landing = inject(
  'userStore',
  'mediaStore'
)(
  observer((props) => {
    const classes = useStyles();
    const location = useLocation();
    const page = location.pathname.split('/')[2];
    const [state, setState] = useState({
      userName: '',
      password: '',
      email: '',
    });
    const [userMessage, setUserMassege] = useState('');
    const [passwordMessage, setPasswordMassege] = useState('');
    const [emailMessage, setEmailMassege] = useState('');
    const [serverMessage, setServerMessage] = useState('');

    const handleInput = ({ target }) => {
      checkInputs();
      const value = target.value;
      setState({
        ...state,
        [target.name]: value,
      });
    };

    const checkInputs = () => {
      if (state.userName.length < 3) {
        setUserMassege('user name needs to be more then 3 letters');
      } else {
        setUserMassege('');
      }

      if (state.password.length < 3) {
        setPasswordMassege('password needs to be more then 3 letters');
      } else {
        setPasswordMassege('');
      }

      if (page === 'register' && state.email.length < 6) {
        setEmailMassege('email needs to be more then 6 letters');
      } else {
        setEmailMassege('');
      }
    };

    const inputBoolen = () =>
      page === 'login'
        ? Boolean(!userMessage && !passwordMessage)
        : !Boolean(userMessage && passwordMessage && emailMessage);

    const enterClicked = async () => {
      if (inputBoolen()) {
        const dataMassage = page === 'login'
          ? await props.userStore.checkUser(state)
          : await props.userStore.saveUser(state)
        if (dataMassage) {
          setServerMessage(dataMassage);
        }
      }
    };

    return (
      <div>
        <Header page='basic' />
        <Paper elevation={0} style={{ width: '100vw' }}>
          <Grid
            container
            justify='center'
            alignItems='center'
            direction='column'
          >
            {page === 'login' ? (
              <Grid item>
                <Typography variant='h3' style={{ marginTop: 30 }}>
                  Login
                </Typography>
              </Grid>
            ) : (
                <Grid item>
                  <Typography variant='h3' style={{ marginTop: 30 }}>
                    Sign-Up
                </Typography>
                </Grid>
              )}
            <form className={classes.root} noValidate autoComplete='off'>
              <Grid item>
                <TextField
                  className={classes.input}
                  id='standard-basic'
                  label='User Name'
                  name='userName'
                  onChange={handleInput}
                  helperText={userMessage}
                  error={userMessage}
                />
                <TextField
                  className={classes.input}
                  id='standard-password-input'
                  label='Password'
                  name='password'
                  type='password'
                  onChange={handleInput}
                  helperText={passwordMessage}
                  error={passwordMessage}
                />
                {page === 'register' && (
                  <TextField
                    className={classes.input}
                    id='standard-basic'
                    name='email'
                    label='Email'
                    type='email'
                    onChange={handleInput}
                    helperText={emailMessage}
                    error={emailMessage}
                  />
                )}
                {/* <TextField error id="standard-error-helper-text" label="Error"  /> */}
              </Grid>
              <Grid item width={200}>
                <Button
                  className={classes.button}
                  variant='contained'
                  color='primary'
                  onClick={enterClicked}
                >
                  Enter
                </Button>
              </Grid>
              {page === 'login' ? (
                <>
                  <Grid item>
                    <Button
                      className={classes.button}
                      variant='contained'
                      color='primary'
                    >
                      <Link
                        style={{ textDecoration: 'none', color: 'whitesmoke' }}
                        to='/auth/register'
                      >
                        Sign-up
                      </Link>
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button size='small' color='primary'>
                      <Link style={{ textDecoration: 'none' }} to='/dashboard'>
                        Skip
                      </Link>
                    </Button>
                  </Grid>
                </>
              ) : (
                  <>
                    <Grid item>
                      <Button size='small' color='primary'>
                        <Link style={{ textDecoration: 'none' }} to='/auth/login'>
                          Login
                      </Link>
                      </Button>
                    </Grid>
                  </>
                )}
              <Grid item>
                <Typography variant='caption' color='error'>
                  {serverMessage}
                </Typography>
              </Grid>
            </form>
          </Grid>
        </Paper>
      </div>
    );
  })
);

export default Landing;
