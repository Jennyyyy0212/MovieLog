import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { 
  Button, 
  TextField, 
  Typography, 
  CssBaseline, 
  Divider, 
  FormControl, 
  FormLabel
 } from '@mui/material';
import AppTheme from '../styles/AppTheme';
import ColorModeSelect from '../styles/ColorModeSelect';
import { FcGoogle } from "react-icons/fc";
import { Card, FullScreenContainer, FormBox } from '../styles/GlobalStyles'; 

const Register = () => {
  const { register } = useContext(AuthContext); // Access register function from AuthContext
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const success = await register(formData.username, formData.email, formData.password);
    
    if (success) {
      navigate("/login"); // Redirect to login after successful registration
    } else {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <FullScreenContainer>
        <Card variant="outlined">
          <FcGoogle />
          <Typography component="h1" variant="h4" sx={{ textAlign: "center" }}>
            Register
          </Typography>

          {error && (
            <Typography color="error" sx={{ textAlign: "center" }}>
              {error}
            </Typography>
          )}

          <FormBox component="form" onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                required
                fullWidth
                id="username"
                placeholder="Your username"
                name="username"
                variant="outlined"
                value={formData.username}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained" color="primary">
              Register
            </Button>
          </FormBox>

          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>

          <Button fullWidth variant="outlined" startIcon={<FcGoogle />} onClick={() => alert("Register with Google")}>
            Register with Google
          </Button>

          <Typography sx={{ textAlign: "center", marginTop: 2 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none", color: "blue" }}>
              Login here
            </Link>
          </Typography>
        </Card>
      </FullScreenContainer>
    </AppTheme>
  );
};

export default Register;
