import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente para verificar a autenticação
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('tokenUsuario'); // Verifica se o token está no localStorage

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
