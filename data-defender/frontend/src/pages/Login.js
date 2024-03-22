import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, { email, password }); 
      console.log('Login successful:', response.data);
      // Store the token in local storage or context for further requests
      localStorage.setItem('token', response.data.token);
      // Redirect user to the dashboard or home page after login
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login attempt failed:', error.response ? error.response.data.message : error.message, error);
      setErrorMessage(error.response ? error.response.data.message : 'Error logging in. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;