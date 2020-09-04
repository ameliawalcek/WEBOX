import React, { useState } from 'react';
import { observer, inject } from 'mobx-react';
import { TextField, Button, Grid, Paper, Typography } from '@material-ui/core';
import Header from '../Header/Header';
import LandingButton from './LandingButton';
import { useLocation } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { useStyles } from '../styles/style';
import { useCookie } from '../../hooks/hooks';

const Landing = inject('userStore')(
  observer((props) => {
    const classes = useStyles();
    const location = useLocation();
    const page = location.pathname.split('/')[2];
    const { checkUser, saveUser } = props.userStore;
    const [state, setState] = useState({
      userName: '',
      password: '',
      email: '',
    });
    const [userMessage, setUserMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [serverMessage, setServerMessage] = useState('');
    const { setCookie } = useCookie();

    const handleInput = ({ target }) => {
      const value = target.value;
      setState({
        ...state,
        [target.name]: value,
      });
    };

    const handleLogin = async (user) => {
      const result = await checkUser(user);
      if (result) {
        return result;
      }
    };

    const handleSignup = async (user) => {
      return saveUser(user).then((res) => {
        if (res.data) {
          setCookie(res.data.userId);
        } else {
          return res;
        }
      });
    };

    const checkInputs = () => {
      if (state.userName.length < 3) {
        setUserMessage('user name needs to be more then 3 letters');
      } else {
        setUserMessage('');
      }

      if (state.password.length < 3) {
        setPasswordMessage('password needs to be more then 3 letters');
      } else {
        setPasswordMessage('');
      }

      if (page === 'register' && state.email.length < 6) {
        setEmailMessage('email needs to be more then 6 letters');
      } else {
        setEmailMessage('');
      }
    };

    const inputBoolean = () =>
      page === 'login'
        ? Boolean(!userMessage && !passwordMessage)
        : !Boolean(userMessage && passwordMessage && emailMessage);

    const enterClicked = async () => {
      checkInputs();
      if (inputBoolean()) {
        const dataMassage =
          page === 'login'
            ? await handleLogin(state)
            : await handleSignup(state);
        if (dataMassage) {
          setServerMessage(dataMassage);
        }
      }
    };

    return (
      <div>
        <Header page='basic' />
        <Paper elevation={0} style={{ width: '100vw', height: '100vh' }}>
          <Grid
            container
            justify='center'
            alignItems='center'
            direction='column'
          >
            <Grid item>
              <Typography
                variant='h4'
                style={{ marginTop: 30, paddingTop: 100 }}
              >
                {page === 'login' ? 'LOGIN' : 'SIGN UP'}
              </Typography>
            </Grid>
            <form className={classes.rootLanding} noValidate autoComplete='off'>
              <Grid item>
                <TextField
                  className={classes.inputLanding}
                  id='standard-basic'
                  label='User Name'
                  name='userName'
                  onChange={handleInput}
                  helperText={userMessage}
                  error={userMessage}
                />
                <TextField
                  className={classes.inputLanding}
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
                    className={classes.inputLanding}
                    id='standard-basic'
                    name='email'
                    label='Email'
                    type='email'
                    onChange={handleInput}
                    helperText={emailMessage}
                    error={emailMessage}
                  />
                )}
              </Grid>
              <Grid item width={200}>
                <Button
                  className={classes.buttonLanding}
                  variant='contained'
                  onClick={enterClicked}
                  color='primary'
                >
                  Enter
                </Button>
              </Grid>
              <Grid item>
                {page === 'login' ? (
                  <LandingButton text={'SIGN UP'} to={'/auth/register'} />
                ) : (
                  <LandingButton text={'LOGIN'} to={'/auth/login'} />
                )}
              </Grid>
              <Grid item>
                <Typography color='secondary'>
                  <Link to='/dashboard' color='secondary'>
                    Skip
                  </Link>
                </Typography>
              </Grid>
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
