import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/Login/Login";
import Register from "../Components/Pages/Register/Register";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* ROTA PROTEGIDA */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Home /> 
                        </ProtectedRoute>
                    }
                />

                {/* ROTA PADRÃO PARA ERROS */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
