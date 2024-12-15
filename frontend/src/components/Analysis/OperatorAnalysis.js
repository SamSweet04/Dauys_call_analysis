import React, { useState } from 'react';
import { LineChart, Line, PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function OperatorSuccessAnalysis() {
  const [date, setDate] = useState(new Date());
  const [filters, setFilters] = useState({
    status: 'all',
    performance: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);

  const operatorData = [
    { id: 1, name: "Иван Иванов", totalCalls: 100, successfulCalls: 80, missedCalls: 5, avgHandlingTime: "4:30", status: "online" },
    { id: 2, name: "Анна Петрова", totalCalls: 95, successfulCalls: 85, missedCalls: 3, avgHandlingTime: "3:45", status: "online" },
    { id: 3, name: "Сергей Сидоров", totalCalls: 110, successfulCalls: 90, missedCalls: 7, avgHandlingTime: "5:00", status: "offline" },
    { id: 4, name: "Елена Козлова", totalCalls: 88, successfulCalls: 75, missedCalls: 4, avgHandlingTime: "4:15", status: "online" },
    { id: 5, name: "Дмитрий Волков", totalCalls: 105, successfulCalls: 95, missedCalls: 2, avgHandlingTime: "3:30", status: "offline" },
  ];

  const successRateData = [
    { name: "Пн", rate: 85 },
    { name: "Вт", rate: 88 },
    { name: "Ср", rate: 90 },
    { name: "Чт", rate: 87 },
    { name: "Пт", rate: 92 },
  ];

  const callTypeData = [
    { name: "Успешные", value: 425 },
    { name: "Упущенные", value: 21 },
    { name: "Незавершенные", value: 54 },
  ];

  const filteredOperatorData = operatorData.filter(operator => {
    if (filters.status !== 'all' && operator.status !== filters.status) return false;
    if (filters.performance === 'high' && operator.successfulCalls / operator.totalCalls < 0.8) return false;
    if (filters.performance === 'low' && operator.successfulCalls / operator.totalCalls >= 0.8) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold">Анализ успеха операторов</h1>
        <nav className="flex space-x-4">
          <button className="text-gray-700 hover:text-gray-900">Дашборд</button>
          <button className="text-gray-700 hover:text-gray-900">Анализ звонков</button>
          <button className="text-gray-700 hover:text-gray-900">Операторы</button>
          <button className="text-gray-700 hover:text-gray-900">Отчеты</button>
        </nav>
      </header>

      <main className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <input type="date" value={date.toISOString().substr(0, 10)} onChange={(e) => setDate(new Date(e.target.value))} className="p-2 border border-gray-300 rounded-lg" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Экспорт отчета</button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Успешность обработки звонков</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={successRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Распределение типов звонков</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={callTypeData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Среднее время обработки</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={operatorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avgHandlingTime" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Детальный анализ операторов</h2>
          <div className="flex justify-between items-center mb-4">
            <input type="text" placeholder="Поиск оператора" className="p-2 border border-gray-300 rounded-lg" />
            <button onClick={() => setShowFilters(!showFilters)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Фильтры</button>
          </div>

          {showFilters && (
            <div className="p-4 border rounded-lg mb-4">
              <div className="flex items-center space-x-2">
                <label className="font-semibold">Статус:</label>
                <select onChange={(e) => setFilters({...filters, status: e.target.value})} className="p-2 border border-gray-300 rounded-lg">
                  <option value="all">Все</option>
                  <option value="online">Онлайн</option>
                  <option value="offline">Офлайн</option>
                </select>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <label className="font-semibold">Производительность:</label>
                <select onChange={(e) => setFilters({...filters, performance: e.target.value})} className="p-2 border border-gray-300 rounded-lg">
                  <option value="all">Все</option>
                  <option value="high">Высокая</option>
                  <option value="low">Низкая</option>
                </select>
              </div>
            </div>
          )}

          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b p-2">Имя оператора</th>
                <th className="border-b p-2">Статус</th>
                <th className="border-b p-2">Всего звонков</th>
                <th className="border-b p-2">Успешные звонки</th>
                <th className="border-b p-2">Упущенные звонки</th>
                <th className="border-b p-2">Среднее время обработки</th>
              </tr>
            </thead>
            <tbody>
              {filteredOperatorData.map(operator => (
                <tr key={operator.id}>
                  <td className="border-b p-2">{operator.name}</td>
                  <td className="border-b p-2">
                    <span className={`inline-block w-2 h-2 rounded-full mr-1 ${operator.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {operator.status === 'online' ? 'Онлайн' : 'Офлайн'}
                  </td>
                  <td className="border-b p-2">{operator.totalCalls}</td>
                  <td className="border-b p-2">{operator.successfulCalls}</td>
                  <td className="border-b p-2">{operator.missedCalls}</td>
                  <td className="border-b p-2">{operator.avgHandlingTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
