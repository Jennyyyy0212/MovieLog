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
import { Card, FullScreenContainer, FormBox } from '../styles/GlobalStyles'; // ✅ Import Global Styles


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <FullScreenContainer>
        <Card variant="outlined">
          <FcGoogle />
          <Typography component="h1" variant="h4" sx={{ textAlign: 'center' }}>
            Login
          </Typography>

          {error && (
            <Typography color="error" sx={{ textAlign: 'center' }}>
              {error}
            </Typography>
          )}

          <FormBox component="form" onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                autoComplete="current-password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </FormBox>

          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>

          <Button fullWidth variant="outlined" startIcon={<FcGoogle />} onClick={() => alert('Login with Google')}>
            Login with Google
          </Button>

          <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ textDecoration: 'none', color: 'blue' }}>
              Register here
            </Link>
          </Typography>
        </Card>
      </FullScreenContainer>
    </AppTheme>
  );
};

export default LoginPage;