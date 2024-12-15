import React from 'react';
import { FaThumbsUp, FaThumbsDown, FaSmile } from 'react-icons/fa';

export default function GeographicalAnalysis() {
  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Географический анализ звонков</h1>

      {/* Regional Map and Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md h-64 flex items-center justify-center">
          <h2 className="text-xl font-semibold">Карта регионов</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="font-semibold text-lg mb-2">Статистика по регионам</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Регион</th>
                <th className="py-2 text-left">Количество звонков</th>
                <th className="py-2 text-left">Тональность</th>
              </tr>
            </thead>
            <tbody>
              {[
                { region: 'Москва', calls: 1234, sentiment: { positive: 60, neutral: 30, negative: 10 } },
                { region: 'Санкт-Петербург', calls: 987, sentiment: { positive: 55, neutral: 35, negative: 10 } },
                { region: 'Новосибирск', calls: 567, sentiment: { positive: 50, neutral: 40, negative: 10 } },
                { region: 'Екатеринбург', calls: 432, sentiment: { positive: 58, neutral: 32, negative: 10 } },
                { region: 'Казань', calls: 321, sentiment: { positive: 62, neutral: 28, negative: 10 } },
              ].map((region, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{region.region}</td>
                  <td className="py-2">{region.calls}</td>
                  <td className="py-2">
                    <FaThumbsUp className="inline text-green-500 mr-1" /> {region.sentiment.positive}%
                    <FaSmile className="inline text-yellow-500 mx-1" /> {region.sentiment.neutral}%
                    <FaThumbsDown className="inline text-red-500 ml-1" /> {region.sentiment.negative}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Regional Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Детальный анализ региона</h2>
          <button className="bg-gray-200 px-4 py-2 rounded-lg">Выберите регион</button>
          <p className="text-3xl font-bold mt-4">1,234</p>
          <p className="text-sm text-green-500">+10.1% с прошлого месяца</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md h-32">
          <h2 className="text-lg font-semibold mb-2">Средняя продолжительность</h2>
          <p className="text-2xl font-bold">4m 32s</p>
          <p className="text-sm text-red-500">-30s с прошлой недели</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md h-32">
          <h2 className="text-lg font-semibold mb-2">Основные проблемы</h2>
          <ul className="text-sm">
            <li>1. Задержка доставки</li>
            <li>2. Качество продукции</li>
            <li>3. Ошибки в заказе</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
