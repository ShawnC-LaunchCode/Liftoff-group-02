import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import withCredentials from '../components/withCredentials';

function RegistrationPage(){
// Replace 'https://api.example.com' with the actual API endpoint
const apiUrl = 'http://localhost:8080/api/users';
const navigate = useNavigate();
const [userData, setUserData] = useState({
  username: '',
  password: '',
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setUserData((prevData) => ({ ...prevData, [name]: value }));
};

const handleRegistration = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/createResource', userData, withCredentials());
    console.log(response.data);  // Handle success response
    if(response.data === "Resource created successfully"){
      navigate('/login');
    }
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

return (
  <div>
    <nav>
        <a className='logo'>EventFlow</a>
      </nav>
    <label>Username:</label>
    <input type="text" name="username" value={userData.username} onChange={handleInputChange} />

    <label>Password:</label>
    <input type="password" name="password" value={userData.password} onChange={handleInputChange} />

    <button onClick={handleRegistration}>Register</button>
  </div>
);
};

export default RegistrationPage;