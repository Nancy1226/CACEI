import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import AeMateria from '../pages/AeMateria';
import Cuestionario from '../pages/Cuestionario';
import ProtectedRoute from './ProtectedRoute';
import { useState } from 'react';

const App = () => {
    const [isLoged, setIsLoged] = useState(() => {
        return sessionStorage.getItem("authenticated") === "true";
    });

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                {/* Ruta protegida */}
                <Route element={<ProtectedRoute/>}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/MT/:id" element={<AeMateria />} />
                    <Route path="/evaluacion/:id" element={<Cuestionario />} />
                </Route>
                {/* Redireccionar a la página de inicio si la ruta no coincide */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
  };

export default App;