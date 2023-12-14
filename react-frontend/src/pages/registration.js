import axios from 'axios';
import React, { useState } from 'react';

function RegistrationPage(){
// Replace 'https://api.example.com' with the actual API endpoint
const apiUrl = 'http://localhost:8080/api/users';
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
    const response = await axios.post('http://localhost:8080/api/createResource', userData);
    console.log(response.data);  // Handle success response
  } catch (error) {
    console.error('Error registering user:', error);
  }
};

return (
  <div>
    <label>Username:</label>
    <input type="text" name="username" value={userData.username} onChange={handleInputChange} />

    <label>Password:</label>
    <input type="password" name="password" value={userData.password} onChange={handleInputChange} />

    <button onClick={handleRegistration}>Register</button>
  </div>
);
};

export default RegistrationPage;