import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/test', { withCredentials: true })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error('Error fetching from backend:', error);
      });
  }, []);

  return (
    <div>
      <h1>Frontend is working!</h1>
      <h2>{message ? `Backend says: ${message}` : 'Loading backend...'}</h2>
    </div>
  );
}

export default App;
