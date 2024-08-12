import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Navbar, Login, Master, Register, QrCode, NotFound, Forms } from './components';

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={ <Master /> }>
        <Route index element={ <QrCode /> } />
        <Route path='/dashboard' element={ <Forms /> }/>
      </Route>
      <Route path="/login" element={ <Login /> } />
      <Route path="*" element={ <NotFound /> } />
      <Route path="/register" element={ <Register /> } />
    </Routes>
    </>
  );
};

export default App
