import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
import Login from './components/Login/Login';
// import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './App.css';
import HighChart from './components/HighChart/HighChart';

const App = () => {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route 
          path="/create-chart" 
          element={
            <ProtectedRoute>
              <HighChart />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
