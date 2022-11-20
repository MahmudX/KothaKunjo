import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Page/Login';
import Home from './Page/Home';
import Nav from './Components/Nav';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Page/Register';
function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="./login" element={<Login />} />
            <Route path="./register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
