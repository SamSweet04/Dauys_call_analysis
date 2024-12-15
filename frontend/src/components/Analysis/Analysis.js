import React from 'react';
import { FaPhone, FaThumbsUp, FaThumbsDown, FaVolumeUp } from 'react-icons/fa';

export default function Analysis() {
  return (
    <main className="flex-1 p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Панель анализа звонков колл-центра</h1>

      {/* Date Range Filter and Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <button className="bg-gray-200 px-4 py-2 rounded-lg">
            Последние 24 часа
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Поиск по звонкам"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-black text-white rounded-lg">
            Поиск
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
          <h2 className="text-lg font-semibold">Всего звонков</h2>
          <p className="text-3xl font-bold mt-2">1,234</p>
          <p className="text-sm text-green-500 mt-1">+20.1% с прошлого месяца</p>
          <FaPhone className="text-gray-500 mt-4" />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
          <h2 className="text-lg font-semibold">Средний балл тональности</h2>
          <p className="text-3xl font-bold mt-2">7.8 / 10</p>
          <p className="text-sm text-green-500 mt-1">+5% с прошлой недели</p>
          <FaThumbsUp className="text-gray-500 mt-4" />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
          <h2 className="text-lg font-semibold">Негативные звонки</h2>
          <p className="text-3xl font-bold mt-2">89</p>
          <p className="text-sm text-red-500 mt-1">-2% со вчерашнего дня</p>
          <FaThumbsDown className="text-gray-500 mt-4" />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
          <h2 className="text-lg font-semibold">Звонки с высокой эмоциональной нагрузкой</h2>
          <p className="text-3xl font-bold mt-2">23</p>
          <p className="text-sm text-green-500 mt-1">+12 за последний час</p>
          <FaVolumeUp className="text-gray-500 mt-4" />
        </div>
      </div>

      {/* Sections for Charts and Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md h-64 flex items-center justify-center">
          <h2 className="text-xl font-semibold">Объем звонков во времени</h2>
          {/* Chart placeholder */}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md h-64 flex items-center justify-center">
          <h2 className="text-xl font-semibold">Анализ тональности</h2>
          {/* Analysis placeholder */}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md h-64 flex items-center justify-center md:col-span-2">
          <h2 className="text-xl font-semibold">Топ проблем</h2>
          {/* Top issues placeholder */}
        </div>
      </div>
    </main>
  );
}
