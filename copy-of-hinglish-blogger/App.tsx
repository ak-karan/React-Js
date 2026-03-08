
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BlogProvider } from './contexts/BlogContext';
import { ThemeProvider } from './contexts/ThemeContext';

import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PostEditorPage from './pages/PostEditorPage';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BlogProvider>
            <Routes>
              <Route path="/admin/login" element={<AdminLoginPage />} />

              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/post/:id" element={<PostPage />} />
              </Route>
              
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="add-post" element={<PostEditorPage />} />
                <Route path="edit-post/:id" element={<PostEditorPage />} />
              </Route>
            </Routes>
        </BlogProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;