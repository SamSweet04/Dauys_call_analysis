import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaPhone,
  FaChevronDown,
  FaChevronUp,
  FaMapMarkerAlt,
  FaChartLine,
  FaHeadset,
  FaUser,
  FaSignOutAlt,
  FaArrowLeft,
  FaArrowRight,
  FaCog
} from 'react-icons/fa';

export default function Sidebar() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleDashboardMenu = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside className={`${isSidebarOpen ? 'w-64' : 'w-16'} h-screen bg-gray-900 text-white transition-all duration-300 relative`}>
      <div className="p-4 text-2xl font-semibold border-b border-gray-700">
        {isSidebarOpen && 'Анализ колл-центра'}
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          {/* Analysis Item with Toggle */}
          <li>
            <Link to="/analysis" className="block">
              <button
                onClick={toggleDashboardMenu}
                className="flex items-center justify-between w-full p-2 hover:bg-gray-700 rounded"
              >
                <div className="flex items-center space-x-2">
                  <FaTachometerAlt />
                  {isSidebarOpen && <span>Аналитика</span>}
                </div>
                {isSidebarOpen && (isDashboardOpen ? <FaChevronUp /> : <FaChevronDown />)}
              </button>
            </Link>
            {isDashboardOpen && isSidebarOpen && (
              <ul className="ml-6 mt-2 space-y-1">
                <li>
                  <Link to="/analysis" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                    <FaChartLine />
                    <span>Обзор</span>
                  </Link>
                </li>
                <li>
                  <Link to="/analysis/geographical" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                    <FaMapMarkerAlt />
                    <span>Географический анализ</span>
                  </Link>
                </li>
                <li>
                  <Link to="/analysis/operator" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
                    <FaChartLine />
                    <span>Анализ успеха операторов</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Calls Item */}
          <li>
            <Link to="/call_list" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
              <FaPhone />
              {isSidebarOpen && <span>Звонки</span>}
            </Link>
          </li>

          {/* Operators Item */}
          <li>
            <Link to="/operator" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
              <FaHeadset />
              {isSidebarOpen && <span>Операторы</span>}
            </Link>
          </li>

          {/* Settings Item */}
          <li>
            <Link to="/settings" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
              <FaCog />
              {isSidebarOpen && <span>Настройки</span>}
            </Link>
          </li>
        </ul>
      </nav>

      {/* Profile and Logout */}
      <div className="absolute bottom-0 w-full p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/profile" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded">
              <FaUser />
              {isSidebarOpen && <span>Профиль</span>}
            </Link>
          </li>
          <li>
            <Link to="/auth" className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded text-red-500">
              <FaSignOutAlt />
              {isSidebarOpen && <span>Выйти</span>}
            </Link>
          </li>
        </ul>

        {/* Toggle Sidebar Button */}
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-full p-2 mt-4 hover:bg-gray-800 rounded text-gray-300"
        >
          {isSidebarOpen ? <FaArrowLeft /> : <FaArrowRight />}
        </button>
      </div>
    </aside>
  );
}
