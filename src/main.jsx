import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import RouteProtected from './containers/RouteProtected'
import ReactDOM from 'react-dom/client'

const router = createBrowserRouter([
  {
    path:'/', element:<Login/>
  },{
    // path: '/', element:<RouteProtected />,
    path:'/dashboard',element:<Dashboard />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
