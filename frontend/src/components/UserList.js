import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../services/api';
import { getSocket } from '../services/socket';

export default function UserList({ token, currentUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers(token).then(res => setUsers(res.data));
    const socket = getSocket();
    if (!socket) return;
    socket.on('users', setUsers);
    return () => socket.off('users');
  }, [token]);

  return (
    <div className="user-list">
    <h3 style={{marginTop: 0}}>Пользователи онлайн:</h3>
    <ul style={{paddingLeft: 0}}>
      {users.map(u => (
        <li key={u.username}>
          {u.username} {u.online && '🟢'} {u.username === currentUser && <b>(Вы)</b>}
        </li>
      ))}
    </ul>
  </div>
  );
}