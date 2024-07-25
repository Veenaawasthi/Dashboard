import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '64px', // 8 * 8px (adjust as needed)
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
   
  },

  formContainer: {
    backgroundColor: 'lightyellow', // Semi-transparent background for the form
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
   
  },

  form: {
    width: '100%', // Fix the width of the form
    marginTop: '8px', // 1 * 8px
  },
  submitButton: {
    margin: '24px 0 16px', // 3 * 8px 0 2 * 8px
    padding: '12px', // Add padding to the button
    
  },
  title: {
    marginBottom: '16px', // Margin below the title
    fontWeight: 'bold', // Make the title bold
    color: 'darkgreen', // Darker color for the title
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  textField: {
    marginBottom: '16px', // Margin below each text field
  },
}));

const mockUsers = [
  { id: 1, email: 'admin@example.com', password: 'password123' },
  { id: 2, email: 'veenaawasthi23@gmail.com', password: '123456' },
  { id: 3, email: 'vivektiwari@risingdestination.com', password: '123456' }
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
      navigate('/dashboard'); // Navigate to home page or desired route
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <div className={classes.formContainer}>
        <Typography component="h1" variant="h5" className={classes.title}>
          <img src="/login.png" alt="login" style={{ width: "40px", height: "45px" }} />
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
            className={classes.textField}
            color='success'
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
            color='success'
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
