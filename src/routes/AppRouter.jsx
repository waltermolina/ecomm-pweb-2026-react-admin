import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import LoginPage from '../pages/Login/LoginPage.jsx';
import HomePage from '../pages/Home/HomePage.jsx';
import ProductsPage from '../pages/Products/ProductsPage.jsx';
import ProductEditorPage from '../pages/Products/ProductEditorPage.jsx';
import CategoriesPage from '../pages/Categories/CategoriesPage.jsx';
import CategoryEditorPage from '../pages/Categories/CategoryEditorPage.jsx';
import UsersPage from '../pages/Users/UsersPage.jsx';
import UserEditorPage from '../pages/Users/UserEditorPage.jsx';
import ProfilePage from '../pages/Profile/ProfilePage.jsx';
import NotFoundPage from '../pages/NotFound/NotFoundPage.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/new" element={<ProductEditorPage />} />
          <Route path="/products/:id" element={<ProductEditorPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/new" element={<CategoryEditorPage />} />
          <Route path="/categories/:id" element={<CategoryEditorPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/new" element={<UserEditorPage />} />
          <Route path="/users/:id" element={<UserEditorPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
