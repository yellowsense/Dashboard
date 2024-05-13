import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { ProviderContext } from 'context/StoreContext';

const Login = () => {
  const { isAuth, setAuth } = useContext(ProviderContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    if (isAuth) {
      navigate('/dashboard');
    }
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async (username, password) => {
    try {
      console.log(username, password);
      const response = await fetch(
        `https://backendapiyellowsense.azurewebsites.net/dashboard_login?username=${username}&password=${password}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        sessionStorage.setItem('authAdmin', true);
        setAuth(true);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
      console.error(error);
      window.alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>
        <em>Welcome Back!</em>
      </h2>
      <form>
        <div className="form-group">
          <label>Username Id:</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
