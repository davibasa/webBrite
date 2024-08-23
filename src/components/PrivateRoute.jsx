import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Componente para verificar a autenticação
const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem('tokenUsuario'); // Verifica se o token está no localStorage

  // Se autenticado, renderiza as rotas privadas, caso contrário redireciona para login
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
