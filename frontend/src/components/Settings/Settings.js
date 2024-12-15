"use client";

import { useState } from "react";
import { Users, Bell, Shield, BarChart, Palette } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [language, setLanguage] = useState("ru");
  const [timezone, setTimezone] = useState("Europe/Moscow");
  const [highCallVolume, setHighCallVolume] = useState(false);
  const [complexConversations, setComplexConversations] = useState(false);
  const [notificationChannel, setNotificationChannel] = useState("Email");

  const users = [
    { id: 1, name: "Иван Иванов", role: "Оператор", email: "ivan@example.com" },
    { id: 2, name: "Анна Петрова", role: "Супервизор", email: "anna@example.com" },
    { id: 3, name: "Сергей Сидоров", role: "Менеджер", email: "sergey@example.com" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-4xl font-semibold text-gray-900">Настройки</h1>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b">
          {["users", "notifications", "security", "reports", "general"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center px-4 py-3 text-lg font-medium ${
                activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
              }`}
            >
              {tab === "users" && <Users className="w-5 h-5 mr-2" />}
              {tab === "notifications" && <Bell className="w-5 h-5 mr-2" />}
              {tab === "security" && <Shield className="w-5 h-5 mr-2" />}
              {tab === "reports" && <BarChart className="w-5 h-5 mr-2" />}
              {tab === "general" && <Palette className="w-5 h-5 mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Users Tab Content */}
        {activeTab === "users" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Управление пользователями</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <input type="text" placeholder="Поиск пользователей" className="border px-3 py-2 rounded w-64" />
                <button className="px-4 py-2 bg-blue-600 text-white rounded">Добавить пользователя</button>
              </div>
              <table className="w-full border mt-4">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Имя</th>
                    <th className="p-2">Роль</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.role}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2 flex space-x-2">
                        <button className="px-2 py-1 border rounded text-blue-600 border-blue-600">Изменить</button>
                        <button className="px-2 py-1 border rounded text-red-600 border-red-600">Удалить</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Notifications Tab Content */}
        {activeTab === "notifications" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Настройка уведомлений</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b py-4">
                <span>Высокий объем звонков</span>
                <button
                  onClick={() => setHighCallVolume(!highCallVolume)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 ${
                    highCallVolume ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                      highCallVolume ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></span>
                </button>
              </div>
              <div className="flex justify-between items-center border-b py-4">
                <span>Эмоционально сложные разговоры</span>
                <button
                  onClick={() => setComplexConversations(!complexConversations)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 ${
                    complexConversations ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                      complexConversations ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></span>
                </button>
              </div>
              <div className="flex justify-between items-center border-b py-4">
                <span>Канал уведомлений</span>
                <select
                  value={notificationChannel}
                  onChange={(e) => setNotificationChannel(e.target.value)}
                  className="border px-3 py-2 rounded"
                >
                  <option value="Email">Email</option>
                  <option value="Telegram">Telegram</option>
                  <option value="SMS">SMS</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab Content */}
        {activeTab === "security" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Управление доступом и безопасностью</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b py-4">
                <span>Двухфакторная аутентификация (2FA)</span>
                <button
                  onClick={() => setHighCallVolume(!highCallVolume)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 ${
                    highCallVolume ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                      highCallVolume ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></span>
                </button>
              </div>
              <div className="mt-4">
                <p className="font-semibold">Журнал действий</p>
                <table className="w-full border mt-4">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-2">Пользователь</th>
                      <th className="p-2">Действие</th>
                      <th className="p-2">Дата</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Анна Петрова</td>
                      <td className="p-2">Изменение настроек уведомлений</td>
                      <td className="p-2">2023-11-15 14:30</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Иван Иванов</td>
                      <td className="p-2">Вход в систему</td>
                      <td className="p-2">2023-11-15 10:15</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab Content */}
        {activeTab === "reports" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Отчеты и аналитика</h2>
            <div className="space-y-4">
              <div className="border-b py-4">
                <label className="block font-semibold">Периодичность отправки отчетов</label>
                <select
                  value="weekly"
                  onChange={(e) => setHighCallVolume(e.target.value)}
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="daily">Ежедневно</option>
                  <option value="weekly">Еженедельно</option>
                  <option value="monthly">Ежемесячно</option>
                </select>
              </div>
              <div className="border-b py-4">
                <p className="font-semibold">Включаемые метрики</p>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="metric1" className="form-checkbox" />
                    <label htmlFor="metric1">Среднее время обработки звонков</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="metric2" className="form-checkbox" />
                    <label htmlFor="metric2">Эмоциональный тон звонков</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="metric3" className="form-checkbox" />
                    <label htmlFor="metric3">Количество успешных решений</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* General Tab Content */}
        {activeTab === "general" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Общие настройки системы</h2>
            <div className="space-y-4">
              <div className="border-b py-4">
                <label className="block font-semibold">Язык интерфейса</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="ru">Русский</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div className="border-b py-4">
                <label className="block font-semibold">Часовой пояс</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="Europe/Moscow">Москва (GMT+3)</option>
                  <option value="Europe/Kaliningrad">Калининград (GMT+2)</option>
                  <option value="Asia/Yekaterinburg">Екатеринбург (GMT+5)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold">Настройки брендинга</label>
                <input type="file" accept="image/*" className="border px-3 py-2 rounded w-full mt-2" />
                <p className="text-sm text-gray-500 mt-1">Загрузите логотип компании (рекомендуемый размер: 200x50px)</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
