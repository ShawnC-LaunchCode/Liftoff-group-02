import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage(){
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/login', loginData);
      console.log(response.data);  // Handle success response
      if(response.data === "Login successful"){
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <label>Username:</label>
      <input type="text" name="username" value={loginData.username} onChange={handleInputChange} />

      <label>Password:</label>
      <input type="password" name="password" value={loginData.password} onChange={handleInputChange} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;