import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaSmile } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function OperatorMonitoring() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const operators = [
    { name: 'Сергей Сидоров', calls: 55, avgDuration: '3:45', sentiment: { positive: 75, neutral: 20, negative: 5 } },
    { name: 'Иван Иванов', calls: 50, avgDuration: '4:23', sentiment: { positive: 70, neutral: 20, negative: 10 } },
    { name: 'Дмитрий Волков', calls: 48, avgDuration: '4:34', sentiment: { positive: 68, neutral: 22, negative: 10 } },
    { name: 'Анна Петрова', calls: 45, avgDuration: '5:12', sentiment: { positive: 65, neutral: 25, negative: 10 } },
    { name: 'Елена Козлова', calls: 40, avgDuration: '4:56', sentiment: { positive: 60, neutral: 30, negative: 10 } },
  ];

  // Фильтрация операторов на основе поискового запроса
  const filteredOperators = operators.filter(operator =>
    operator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Мониторинг операторов</h1>

      {/* Поисковая строка */}
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Поиск оператора"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Список операторов */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="font-semibold text-lg mb-2">Список операторов</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Имя оператора</th>
              <th className="py-2 text-left">Количество звонков</th>
              <th className="py-2 text-left">Средняя длительность</th>
              <th className="py-2 text-left">Тональность</th>
              <th className="py-2 text-left">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredOperators.map((operator, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{operator.name}</td>
                <td className="py-2">{operator.calls}</td>
                <td className="py-2">{operator.avgDuration}</td>
                <td className="py-2">
                  <FaThumbsUp className="inline text-green-500 mr-1" /> {operator.sentiment.positive}%
                  <FaSmile className="inline text-yellow-500 mx-1" /> {operator.sentiment.neutral}%
                  <FaThumbsDown className="inline text-red-500 ml-1" /> {operator.sentiment.negative}%
                </td>
                <td className="py-2">
                  <button
                    onClick={() => navigate(`/operator/${operator.name}`)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Подробнее
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
