import * as productsApi from '../api/productsApi.js';
import * as categoriesApi from '../api/categoriesApi.js';
import * as usersApi from '../api/usersApi.js';

export const resources = {
  products: {
    path: 'products',
    label: 'Productos',
    singular: 'producto',
    list: productsApi.getProducts,
    get: productsApi.getProduct,
    create: productsApi.createProduct,
    update: productsApi.updateProduct,
    remove: productsApi.deleteProduct,
    columns: [
      { key: 'name', label: 'Nombre' },
      { key: 'category', label: 'Categoría', value: (item) => item.category?.name ?? item.category ?? '—' },
      { key: 'price', label: 'Precio', value: (item) => item.price == null ? '—' : `$${item.price}` },
      { key: 'stock', label: 'Stock' },
    ],
    fields: [
      { name: 'name', label: 'Nombre', required: true },
      { name: 'description', label: 'Descripción', type: 'textarea', required: true },
      { name: 'price', label: 'Precio', type: 'number', required: true, min: 0, step: '0.01' },
      { name: 'stock', label: 'Stock', type: 'number', required: true, min: 0, step: '1' },
      { name: 'categoryId', label: 'ID de categoría', required: true },
    ],
  },
  categories: {
    path: 'categories',
    label: 'Categorías',
    singular: 'categoría',
    list: categoriesApi.getCategories,
    get: categoriesApi.getCategory,
    create: categoriesApi.createCategory,
    update: categoriesApi.updateCategory,
    remove: categoriesApi.deleteCategory,
    columns: [
      { key: 'name', label: 'Nombre' },
      { key: 'description', label: 'Descripción' },
    ],
    fields: [
      { name: 'name', label: 'Nombre', required: true },
      { name: 'description', label: 'Descripción', type: 'textarea', required: true },
    ],
  },
  users: {
    path: 'users',
    label: 'Usuarios',
    singular: 'usuario',
    list: usersApi.getUsers,
    get: usersApi.getUser,
    create: usersApi.createUser,
    update: usersApi.updateUser,
    remove: usersApi.deleteUser,
    columns: [
      { key: 'name', label: 'Nombre' },
      { key: 'email', label: 'Correo electrónico' },
      { key: 'role', label: 'Rol' },
    ],
    fields: [
      { name: 'name', label: 'Nombre', required: true },
      { name: 'email', label: 'Correo electrónico', type: 'email', required: true },
      { name: 'role', label: 'Rol', required: true },
      { name: 'password', label: 'Contraseña', type: 'password', required: true, createOnly: true },
    ],
  },
};
