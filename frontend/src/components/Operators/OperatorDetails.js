import React from 'react';
import { useParams } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown, FaSmile } from 'react-icons/fa';

export default function OperatorDetails() {
  const { name } = useParams();

  const operators = [
    { name: 'Сергей Сидоров', calls: 55, avgDuration: '3:45', sentiment: { positive: 75, neutral: 20, negative: 5 } },
    { name: 'Иван Иванов', calls: 50, avgDuration: '4:23', sentiment: { positive: 70, neutral: 20, negative: 10 } },
    { name: 'Дмитрий Волков', calls: 48, avgDuration: '4:34', sentiment: { positive: 68, neutral: 22, negative: 10 } },
    { name: 'Анна Петрова', calls: 45, avgDuration: '5:12', sentiment: { positive: 65, neutral: 25, negative: 10 } },
    { name: 'Елена Козлова', calls: 40, avgDuration: '4:56', sentiment: { positive: 60, neutral: 30, negative: 10 } },
  ];

  const operator = operators.find(op => op.name === name);

  if (!operator) {
    return <div>Оператор не найден</div>;
  }

  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Детали оператора: {operator.name}</h1>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="font-semibold text-lg mb-2">Общая информация</h2>
        <p><strong>Количество звонков:</strong> {operator.calls}</p>
        <p><strong>Средняя длительность звонка:</strong> {operator.avgDuration}</p>
        <p><strong>Тональность:</strong></p>
        <p>
          <FaThumbsUp className="inline text-green-500 mr-1" /> {operator.sentiment.positive}%
          <FaSmile className="inline text-yellow-500 mx-1" /> {operator.sentiment.neutral}%
          <FaThumbsDown className="inline text-red-500 ml-1" /> {operator.sentiment.negative}%
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="font-semibold text-lg mb-2">Рекомендации по обучению</h2>
        <ul className="list-disc list-inside">
          <li>Прохождение курса по управлению стрессом и эмоциональным состоянием.</li>
          <li>Повышение навыков разрешения конфликтных ситуаций.</li>
          <li>Улучшение навыков активного слушания и эмпатии.</li>
        </ul>
      </div>
    </main>
  );
}
