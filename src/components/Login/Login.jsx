import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importing CSS for styling

// Functional component for the login form
const Login = () => {
  // State variables to hold email, password, and error message
  const [email, setEmail] = useState('eve.holt@reqres.in'); // Default email for demonstration
  const [password, setPassword] = useState('cityslicka'); // Default password for demonstration
  const [error, setError] = useState(''); // State to hold error messages
  
  // Hook for navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear any previous error messages

    try {
      // Sending a POST request to the login API
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Sending email and password as JSON
      });

      const data = await response.json(); // Parsing the JSON response
      if (response.ok) {
        // If login is successful, store the token in local storage
        localStorage.setItem('token', data.token);
        // Navigate to the create-chart page
        navigate('/create-chart');
      } else {
        // If login fails, set the error message
        setError(data.message || 'User Name or Password not correct');
      }
    } catch (error) {
      // Handling any unexpected errors
      setError('An error occurred');
    }
  };

  // Render the login form
  return (
    <div className="login-container">
      <h3>LOGIN</h3>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {/* Display error message if any */}
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
