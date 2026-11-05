# Sprint 7 — Commerce Admin

Panel administrativo académico construido con React, React Router y Fetch API. Consume la API REST de los Sprints 5 y 6; este repositorio contiene exclusivamente el frontend.

## Requisitos y ejecución

- Node.js 20.19+ y npm.
- Copia `.env.example` a `.env` y configura `VITE_API_URL` con el origen de la API. Si se sirve desde el mismo origen, puede dejarse vacío.
- `npm install`
- `npm run dev`
- `npm run build` genera la versión de producción en `dist/`; `npm run preview` permite revisarla localmente.

## Arquitectura

```text
src/
├── api/          Servicios por recurso y cliente HTTP autenticado
├── components/   atoms, molecules, organisms y common
├── contexts/     Sesión JWT compartida
├── hooks/        useAuth y useApi
├── layouts/      Disposición de autenticación y dashboard
├── pages/        Login, Home, Products, Categories, Users, Perfil, 404 y CRUD compartido
├── routes/       Router y guardia de rutas privadas
├── styles/       Estilos responsivos globales
├── utils/        Configuración de recursos y normalización de respuestas
├── App.jsx
└── main.jsx
```

### Mapa de componentes

`main.jsx` monta `BrowserRouter` y `AuthProvider`; `App.jsx` delega a `AppRouter`. Las rutas protegidas muestran `DashboardLayout`, que contiene `Sidebar` y la página actual mediante `Outlet`. Las pantallas CRUD reutilizan `ResourceListPage`, `ResourceEditorPage`, `ResourceTable`, `ResourceForm`, `FormField` y estados comunes de solicitud.

Atomic Design se aplica a piezas reutilizables de UI (campo, formulario y tabla), no como una taxonomía rígida para páginas.

### Diagrama de navegación

```text
/ ── redirección ──> /home
/login ── login correcto ──> /home (o destino privado solicitado)
                         └── login rechazado ──> mensaje de error
Rutas privadas sin JWT ──> /login
Rutas privadas con JWT:
  /home | /products | /products/new | /products/:id
  /categories | /categories/new | /categories/:id
  /users | /users/new | /users/:id | /profile
  /* ──> Not Found
Logout ──> /login
```

## Rutas y endpoints

| Ruta React | Acceso | Vista |
|---|---|---|
| `/` | Protegida | Redirige a `/home` |
| `/login` | Pública | Inicio de sesión |
| `/home` | Protegida | Resumen de tienda |
| `/products`, `/products/new`, `/products/:id` | Protegidas | Listado, alta, edición/eliminación |
| `/categories`, `/categories/new`, `/categories/:id` | Protegidas | CRUD de categorías |
| `/users`, `/users/new`, `/users/:id` | Protegidas | CRUD de usuarios |
| `/profile` | Protegida | Consulta/edición del usuario autenticado |
| `/*` | Pública | Página 404 |

| Método | Endpoint | Uso |
|---|---|---|
| POST | `/api/auth/login` | Validar credenciales y recibir JWT/usuario |
| GET | `/api/stats` | Totales del dashboard |
| GET, POST | `/api/products` | Listar y crear productos |
| GET, PUT, DELETE | `/api/products/:id` | Consultar, actualizar y eliminar |
| GET, POST | `/api/categories` | Listar y crear categorías |
| GET, PUT, DELETE | `/api/categories/:id` | Consultar, actualizar y eliminar |
| GET, POST | `/api/users` | Listar y crear usuarios |
| GET, PUT, DELETE | `/api/users/:id` | Consultar, actualizar y eliminar |

## Conceptos de la demo

- **Context API:** `AuthContext` expone sesión, login y logout a toda la aplicación sin prop drilling ni estado global adicional.
- **JWT:** el token se guarda en `localStorage` para persistir al recargar; `apiRequest` lo envía en el encabezado de autorización con esquema bearer. El JWT no reemplaza la validación del servidor.
- **Protected Routes:** `ProtectedRoute` usa el contexto para enviar usuarios no autenticados a Login y conserva la ruta de destino.
- **Servicios desacoplados:** los módulos de `api/` conocen los endpoints y el cliente común conoce transporte/errores; las páginas se enfocan en presentación y flujo.
- **Hooks:** `useApi` gestiona carga, error y reintento de lecturas; `useAuth` entrega acceso tipado por convención al contexto de sesión.

La API debe aceptar los cuerpos del formulario (producto: nombre, descripción, precio, stock e ID de categoría; categoría: nombre y descripción; usuario: nombre, correo, rol y contraseña al crear). Se admiten respuestas de colección como arreglo, `{ "data": [...] }` o `{ "items": [...] }`, y respuestas de detalle como objeto o `{ "data": {...} }`.

## Experiencia y accesibilidad

Los listados incluyen búsqueda local, mensajes de carga/error/vacío y confirmación de eliminación. Los formularios son controlados, aprovechan validación HTML y ofrecen mensajes de respuesta. El menú lateral se convierte en panel móvil con botón hamburguesa, overlay y transición.

## Pull Request

**Título:** `feat: implement Sprint 7 React admin dashboard with JWT`

**Descripción:** Implementa el frontend del Sprint 7 como una demo React académica. Incluye autenticación JWT con persistencia y cierre de sesión, rutas protegidas, dashboard responsivo, resumen de estadísticas, navegación, búsqueda y CRUD de productos/categorías/usuarios, perfil, estados UX y documentación de arquitectura y endpoints. No modifica el backend. Configurar `VITE_API_URL` para apuntar a la API de los Sprints 5 y 6.