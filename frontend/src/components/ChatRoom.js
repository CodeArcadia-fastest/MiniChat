import React, { useEffect, useState, useRef } from 'react';
import { fetchMessages } from '../services/api';
import { connectSocket, getSocket } from '../services/socket';

export default function ChatRoom({ token, username }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Получаем историю сообщений
    fetchMessages(token).then(res => setMessages(res.data));
    // Подключаемся к сокету
    const socket = connectSocket(token);

    // Получаем новые сообщения в реальном времени
    socket.on('chat message', msg => {
      setMessages(prev => [...prev, msg]);
    });

    // Очищаем соединение при размонтировании
    return () => socket.disconnect();
  }, [token]);

  useEffect(() => {
    // Скроллим вниз при появлении новых сообщений
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      getSocket().emit('chat message', { text: input, username });
      setInput('');
    }
  };

  return (
    <div>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div className="chat-message" key={i}>
            <b>{msg.username}:</b> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{display: 'flex', gap: 8}}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Введите сообщение"
          style={{flex: 1}}
        />
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
}