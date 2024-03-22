import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
        username,
        email,
        password,
      });
      console.log('Registration successful', response.data);
      // Navigate to the login page or dashboard page after successful registration
      window.location.href = '/login';
    } catch (error) {
      const message = error.response ? error.response.data.message : 'Error registering. Please try again.';
      setErrorMessage(message);
      console.error('Registration failed:', message);
      console.error('Error details:', error.response ? error.response : error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        <label>Username</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;