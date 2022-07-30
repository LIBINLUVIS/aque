import React from 'react';
import HookMqtt from './components/Hook';
import Login from './components/Hook/Login';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route element={<HookMqtt />} path="/home" />
        <Route element={<Login/>} path="/" />
        </Routes>
      </Router>
      

    </div>
  );
}

export default App;
