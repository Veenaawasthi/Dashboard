import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: 'lightyellow',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    width: '100%',
    marginTop: '8px',
  },
  submitButton: {
    margin: '24px 0 16px',
    padding: '12px',
  },
  title: {
    marginBottom: '16px',
    fontWeight: 'bold',
    color: 'darkgreen',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  textField: {
    marginBottom: '16px',
  },
}));

const Login = ({ onLogin }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage('Username and password are required');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        Cookies.set('jwt', data.access, { path: '/' });
        localStorage.setItem('role', data.role); // Save user role
        onLogin(true);
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.non_field_errors || 'Invalid credentials';
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      setErrorMessage('Error logging in: ' + error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.formContainer}>
        <Typography component="h1" variant="h5" className={classes.title}>
          <img src="/login.png" alt="login" style={{ width: '40px', height: '45px' }} />
          Login
        </Typography>
        {errorMessage && (
          <Typography variant="body2" color="error" align="center">
            {errorMessage}
          </Typography>
        )}
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={classes.textField}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.textField}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            className={classes.submitButton}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;


