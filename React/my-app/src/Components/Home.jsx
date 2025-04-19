import React, { useState } from 'react';
import './Home.css'; 
import axios from 'axios';

const Home = () => {
 
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Password strength logic
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 0) strength += 20;
    if (password.length > 7) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    return strength;
  };
  const [password, setPassword] = useState('');
  const passwordStrength = getPasswordStrength(password);
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [email, setEmail] = useState('');
 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8080/Administators/loginAdministrator', {
            email,
            password,
        });

        console.log('Login successful!', response.data.token);
        // כאן תוכל לשמור את הטוקן או לעבור לדף אחר
    } catch (error) {
        if (error.response) {
            console.error('Login failed:', error.response.data);
        } else {
            console.error('Error during login:', error.message);
        }
    }
};

 

  return (
    <div className="login-container">
      {/* <img src="/api/placeholder/80/80" alt="Profile" className="profile-image" /> */}
      <h1>Welcome, User!</h1>
      <p className="subtitle">Sign in to continue</p>

      <form>
        <div className="input-field">
          <label className="input-label" htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email address" />
        </div>

        <div className="input-field">
          <label className="input-label" htmlFor="password">Password</label>
          <div className="password-field">
            <input 
              type={passwordVisible ? 'text' : 'password'} 
              id="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="password-toggle" onClick={togglePasswordVisibility}>
              {passwordVisible ? '🔒' : '👁️'}
            </button>
            <div className="password-strength">
              <div 
                className="password-strength-meter" 
                style={{ width: `${passwordStrength}%`, backgroundColor: passwordStrength <= 20 ? '#ff4d4d' : passwordStrength <= 40 ? '#ffa64d' : passwordStrength <= 60 ? '#ffff4d' : passwordStrength <= 80 ? '#4dff4d' : '#4d4dff' }} 
              />
            </div>
            <div className="password-strength-text">
              <span>{passwordStrength <= 20 ? 'Very weak' : passwordStrength <= 40 ? 'Weak' : passwordStrength <= 60 ? 'Medium' : passwordStrength <= 80 ? 'Strong' : 'Very strong'}</span>
              <span>{passwordStrength}%</span>
            </div>
            <div className="password-hint">
              Use a mix of letters, numbers, and symbols for a strong password
            </div>
          </div>
        </div>

        <div className="checkbox-container">
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>

 
        <button type="submit" className="sign-in-button" onClick={handleLogin}>Sign In</button>
      </form>
    </div>
  );
}

export default Home;
