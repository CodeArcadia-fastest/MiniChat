import React, { useState } from 'react';
import { register, login } from '../services/api';

export default function Auth({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fn = isLogin ? login : register;
      const res = await fn(username, password);
      onAuth(res.data.token, username);
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка');
    }
  };

  return (
    <div>
      <h2 style={{textAlign: 'center', marginBottom: 24}}>{isLogin ? 'Вход' : 'Регистрация'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Имя пользователя"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" style={{width: '100%'}}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
      </form>
      <button className="form-switch" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Нет аккаунта? Регистрация' : 'Уже есть аккаунт? Войти'}
      </button>
      {error && <div style={{color: '#ff6f6f', marginTop: 10, textAlign: 'center'}}>{error}</div>}
    </div>
  );
}