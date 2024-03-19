import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import RouteProtected from './containers/ProtectedRoute'
import ReactDOM from 'react-dom/client'
import './assets/styles/index.css'
import AeMateria from './pages/AeMateria'
import Cuestionario from './pages/Cuestionario'
import ProtectedRoute from './containers/ProtectedRoute'// Importa tu componente ProtectedRoute

const router = createBrowserRouter([
  {
    path:'/', element:<Login/>
  },
  {
    // Usa ProtectedRoute para la ruta /dashboard
    path:'/dashboard', element:<Dashboard />
  },
  {
    path: "/MT/:id", element: <AeMateria/>
  },
  {
    path: "/evaluacion/:id", element:<Cuestionario/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
