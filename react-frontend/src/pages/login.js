import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import withCredentials from '../components/withCredentials';

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
    let formData = new FormData();
    formData.append("username", loginData.username);
    formData.append("password", loginData.password);
    try {
      const response = await axios.post('http://localhost:8080/handlelogin', formData, {
        headers: {'Content-Type': 'multipart/form-data'}, 
        withCredentials: true    
      });
      console.log(response.data);  // Handle success response
      if(response.status === 204){
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <nav>
        <a className='logo'>EventFlow</a>
      </nav>
      <label>Username:</label>
      <input type="text" name="username" value={loginData.username} onChange={handleInputChange} />

      <label>Password:</label>
      <input type="password" name="password" value={loginData.password} onChange={handleInputChange} />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;