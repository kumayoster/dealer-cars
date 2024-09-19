import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import CatalogPage from './pages/CatalogPage';
import AdminDashboard from './pages/AdminDashboard';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage'
import PrivateRoute from './components/PrivateRoute';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={isAuthenticated() ? <Navigate to="/catalog" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={< RegisterPage />} />
      <Route path="/catalog" element={<PrivateRoute><CatalogPage /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />

    </Routes>
  );
};

export default AppRoutes;
