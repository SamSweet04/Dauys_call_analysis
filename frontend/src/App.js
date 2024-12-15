import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import CallAnalysis from "./components/CallAnalysis/CallAnalysis";
import CallList from "./components/CallsList/CallsList";
import Analysis from "./components/Analysis/Analysis";
import GeographicalAnalysis from "./components/Analysis/GeoAnalysis";
import OperatorMonitoring from "./components/Operators/OperatorMonitoring";
import OperatorDetails from "./components/Operators/OperatorDetails";
import OperatorSuccessAnalysis from "./components/Analysis/OperatorAnalysis";
import Settings from "./components/Settings/Settings";
import Profile from "./components/Profile/Profile";
import Auth from "./components/Authorization/Auth";


function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Analysis />} />
            <Route path="/call_list" element={<CallList />} />
            <Route path="/calls/:id" element={<CallAnalysis />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/analysis/geographical" element={<GeographicalAnalysis />} />
            <Route path="/operator" element={<OperatorMonitoring />} />
            <Route path="/operator/:name" element={<OperatorDetails />} />
            <Route path="/analysis/operator" element={<OperatorSuccessAnalysis />} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
