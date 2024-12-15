"use client";

import { useState } from "react";
import { User, Lock, Bell } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [personalInfo, setPersonalInfo] = useState({
    name: "Иван Иванов",
    email: "ivan@example.com",
    phone: "+7 (999) 123-45-67"
  });
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [newReports, setNewReports] = useState(false);
  const [criticalAlerts, setCriticalAlerts] = useState(false);
  const [systemUpdates, setSystemUpdates] = useState(false);

  const activeSessions = [
    { id: 1, device: "Chrome на Windows", lastActive: "2023-11-15 14:30" },
    { id: 2, device: "Safari на iPhone", lastActive: "2023-11-14 09:45" }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl font-semibold text-gray-900">Профиль</h1>

        {/* Tab Navigation */}
        <div className="flex space-x-4 border-b">
          {["personal", "security", "notifications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center px-4 py-3 text-lg font-medium ${
                activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
              }`}
            >
              {tab === "personal" && <User className="w-5 h-5 mr-2" />}
              {tab === "security" && <Lock className="w-5 h-5 mr-2" />}
              {tab === "notifications" && <Bell className="w-5 h-5 mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Personal Information Tab Content */}
        {activeTab === "personal" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Личные данные</h2>
            <form className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  <span className="text-3xl">ИИ</span>
                </div>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md">
                  Изменить аватар
                </button>
              </div>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Имя</label>
                <input
                  id="name"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Телефон</label>
                <input
                  id="phone"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Сохранить изменения
              </button>
            </form>
          </div>
        )}

        {/* Security Tab Content */}
        {activeTab === "security" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text -gray-900 mb-4">Безопасность</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="current-password" className="text-sm font-medium text-gray-700">
                  Текущий пароль
                </label>
                <input
                  id="current-password"
                  type="password"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="new-password" className="text-sm font-medium text-gray-700">
                  Новый пароль
                </label>
                <input
                  id="new-password"
                  type="password"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                  Подтвердите новый пароль
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Изменить пароль
              </button>
            </form>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Активные сессии</h3>
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2">Устройство</th>
                    <th className="p-2">Последняя активность</th>
                    <th className="p-2">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {activeSessions.map((session) => (
                    <tr key={session.id} className="border-b">
                      <td className="p-2">{session.device}</td>
                      <td className="p-2">{session.lastActive}</td>
                      <td className="p-2">
                        <button className="px-2 py-1 border rounded text-red-600 border-red-600">
                          Завершить сессию
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Двухфакторная аутентификация (2FA)</label>
                <p className="text-sm text-gray-500">Повысьте безопасность вашего аккаунта</p>
              </div>
              <button
                onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                className={`w-12 h-6 flex items-center rounded-full p-1 ${
                  twoFactorAuth ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                    twoFactorAuth ? "translate-x-6" : "translate-x-0"
                  }`}
                ></span>
              </button>
            </div>
          </div>
        )}

        {/* Notifications Tab Content */}
        {activeTab === "notifications" && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Уведомления</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b py-4">
                <span>Новые отчеты</span>
                <button
                  onClick={() => setNewReports(!newReports)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 ${
                    newReports ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                      newReports ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></span>
                </button>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <span>Критические предупреждения</span>
                <button
                  onClick={() => setCriticalAlerts(!criticalAlerts)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 ${
                    criticalAlerts ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                      criticalAlerts ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></span>
                </button>
              </div>
              <div className="flex items-center justify-between border-b py-4">
                <span>Обновления системы</span>
                <button
                  onClick={() => setSystemUpdates(!systemUpdates)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 ${
                    systemUpdates ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                      systemUpdates ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

