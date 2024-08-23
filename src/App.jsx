import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import { Navbar, Login, Master, Register, QrCode, NotFound, Forms, Calendar } from './components';
import PrivateRoute from './components/PrivateRoute'; // Importa o componente PrivateRoute

const App = () => {
  return (
    <>
      <Routes>
        {/* Rotas protegidas */}
        <Route path="/" element={<Master />}>
          <Route index element={<QrCode />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Forms />
              </PrivateRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <PrivateRoute>
                <Calendar />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
