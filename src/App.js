import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';

import Login from './Component/Login';
import Form from './Component/Form';
import Dashboard from './Component/Dashboard2';
import Tourform from './Component/Tourform';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [forms, setForms] = useState([]);

  const addForm = (form) => {
    setForms([...forms, form]);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className="app">
        {isLoggedIn && (
          <button className="hamburger-menu" onClick={toggleSidebar}>
           <img src={process.env.PUBLIC_URL + '/home.png'} style={{ padding: '0.5px', width: '24px', height: '24px', backgroundColor:'red'}} />
          </button>
        )}

        {isLoggedIn && isSidebarOpen && (
          <div className="sidebar">
            <ul>
              <li><Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}><img src={process.env.PUBLIC_URL + '/dashboard.png'} style={{ padding: '0.5px', width: '24px', height: '24px' }} /><span style={{ fontSize: '17px' }}>Dashboard</span>
              </Link></li>
              <li><Link to="/tourform" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}><img src={process.env.PUBLIC_URL + '/flowsheet.png'} style={{ padding: '0.5px', width: '24px', height: '24px' }} /><span style = {{ fontSize:'17px'}}>Query Form</span></Link></li>
              <li><Link to="/form" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}><img src={process.env.PUBLIC_URL + '/flowsheet.png'} style={{ padding: '0.5px', width: '24px', height: '24px' }} /><span style = {{fontsize:'17px'}}>Itinerary Form</span></Link></li>
              <li><Link to="/login" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}><img src={process.env.PUBLIC_URL + '/logout.png'} style={{ padding: '0.5px', width: '24px', height: '24px' }} /><span style = {{fontsize:'17px'}}>Logout</span></Link></li>
            </ul>
          </div>
        )}

        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            {isLoggedIn ? (
              <>
                <Route path="/form" element={<Form onSubmit={addForm} />} />
                <Route path="/dashboard" element={<Dashboard forms={forms} />} />
                <Route path="/tourform" element={<Tourform form={forms} />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;




