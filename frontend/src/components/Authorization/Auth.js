import React, { useState } from 'react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    // Add login or registration logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? 'Вход в систему' : 'Регистрация'}
        </h2>

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">
              Имя пользователя
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Введите имя пользователя"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">
              Пароль
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Введите пароль"
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-gray-700">
                Подтвердите пароль
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Повторите пароль"
                required
              />
            </div>
          )}
          <button type="submit" className="w-full py-2 bg-black text-white rounded">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-4 text-blue-500 hover:underline w-full text-center"
        >
          {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войти'}
        </button>
      </div>
    </div>
  );
}
