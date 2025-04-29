import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!rollNumber || !name) {
      alert('Please enter both Roll Number and Name');
      return;
    }

    try {
      const response = await fetch('https://dynamic-form-generator-9rl7.onrender.com/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rollNumber, name }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save roll number for later use (in DynamicForm)
        localStorage.setItem('rollNumber', rollNumber);
        // Redirect to form page
        navigate('/form');
      } else {
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong during login.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
      /><br /><br />
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
