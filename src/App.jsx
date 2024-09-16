import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import { Login, Master, Register, QrCode, NotFound, Calendar, MasterPublic, Table } from './components';
import PrivateRoute from './components/PrivateRoute'; // Importa o componente PrivateRoute

const App = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<MasterPublic />}>
      <Route path="/calendar/:empresa/:dentista" element={<Calendar />} />
        {/* <Route path="/calendar" element={<Calendar />} /> */}
      </Route>

      {/* Rotas protegidas */}
      <Route element={<PrivateRoute /> }>
        <Route path="/" element={<Master />}>
          <Route path="/home" element={<QrCode />} />
          <Route path="/dashboard" element={<Table />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
