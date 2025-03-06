// Utility functions for handling the authentication token

// Get token from local storage
export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Set token in local storage
  export const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Remove token from local storage
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  // Check if user is authenticated based on token presence
  export const isAuthenticated = () => {
    return !!getToken();
  };
  
  // Get token expiration status
  export const isTokenExpired = (token) => {
    try {
      // JWT tokens are in format: header.payload.signature
      const payload = token.split('.')[1];
      // Decode base64
      const decodedPayload = JSON.parse(atob(payload));
      // Check if token is expired
      return decodedPayload.exp < Date.now() / 1000;
    } catch (error) {
      return true; // If we can't decode the token, consider it expired
    }
  };