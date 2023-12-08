import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
// Replace 'https://api.example.com' with the actual API endpoint
const apiUrl = 'http://localhost:8080/api/users';

// Making a GET request
axios.get(apiUrl)
  .then(response => {
    // Handle the successful response
    console.log('Response:', response.data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error.message);
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
