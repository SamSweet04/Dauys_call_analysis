import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Smile } from 'lucide-react';

export default function CallList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const callData = [
    { id: 1, date: '2023-06-01', duration: '5:23', sentiment: 'positive', operator: 'Иван Иванов', client: 'Петр Петров' },
    { id: 2, date: '2023-06-02', duration: '3:45', sentiment: 'negative', operator: 'Мария Сидорова', client: 'Анна Кузнецова' },
    { id: 3, date: '2023-06-03', duration: '7:12', sentiment: 'neutral', operator: 'Алексей Смирнов', client: 'Ольга Новикова' },
    { id: 4, date: '2023-11-13', duration: '4:56', sentiment: 'positive', operator: 'Павел Д.', client: 'ООО "Вектор"' },
    { id: 5, date: '2023-11-13', duration: '6:34', sentiment: 'neutral', operator: 'Елена В.', client: 'ИП Сидоров' },
  ];

  const filteredCalls = callData.filter((call) =>
    call.operator.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <div className="text-3xl font-semibold mb-6">Список звонков</div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Поиск по оператору или клиенту"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="font-semibold text-lg mb-2">Звонки</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Дата</th>
              <th className="py-2 text-left">Длительность</th>
              <th className="py-2 text-left">Тональность</th>
              <th className="py-2 text-left">Оператор</th>
              <th className="py-2 text-left">Клиент</th>
              <th className="py-2 text-left">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredCalls.map((call) => (
              <tr key={call.id} className="border-b">
                <td className="py-2">{call.date}</td>
                <td className="py-2">{call.duration}</td>
                <td className="py-2">
                  {call.sentiment === 'positive' && <ThumbsUp className="inline text-green-500" />}
                  {call.sentiment === 'negative' && <ThumbsDown className="inline text-red-500" />}
                  {call.sentiment === 'neutral' && <Smile className="inline text-yellow-500" />}
                </td>
                <td className="py-2">{call.operator}</td>
                <td className="py-2">{call.client}</td>
                <td className="py-2">
                  <button
                    className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    onClick={() => navigate(`/calls/${call.id}`)} // Navigate to details page
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
