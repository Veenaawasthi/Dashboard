import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    marginTop: '64px', // 8 * 8px (adjust as needed)
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix the width of the form
    marginTop: '8px', // 1 * 8px
  },
  submitButton: {
    margin: '24px 0 16px', // 3 * 8px 0 2 * 8px
  },
});

const mockUsers = [
  { id: 1, email: 'admin@example.com', password: 'password123' },
  { id: 2, email: 'veenaawasthi23@gmail.com', password: '123456' }
  // Add more users as needed
];

const Login = ({ onLogin }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent form submission from refreshing the page

    // Trim whitespace from email and password
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Validate email format (simple check for @ symbol)
    if (!trimmedEmail.includes('@')) {
      alert('Invalid email format');
      return;
    }

    // Validate password contains only numeric digits
    if (!/^\d+$/.test(trimmedPassword)) {
      alert('Password must contain only numeric digits');
      return;
    }

    // Check against the mock database
    const user = mockUsers.find(
      (user) => user.email === trimmedEmail && user.password === trimmedPassword
    );

    if (user) {
      alert('Successfully logged in!');
      onLogin(true); // Notify parent component (App.js) of successful login
      navigate('/'); // Navigate to home page or desired route
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form className={classes.form} onSubmit={handleLogin}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;




