import React, { useState } from 'react';
import Auth from './components/Auth';
import ChatRoom from './components/ChatRoom';
import UserList from './components/UserList';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const handleAuth = (token, username) => {
    setToken(token);
    setUsername(username);
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload();
  };

  if (!token) return (
    <div className="app-container">
      <Auth onAuth={handleAuth} />
    </div>
  );

  return (
    <div className="app-container">
    <button onClick={handleLogout} style={{float: 'right', marginBottom: 10}}>Выйти</button>
    <UserList token={token} currentUser={username} />
    <ChatRoom token={token} username={username} />
  </div>
  );
}

export default App;