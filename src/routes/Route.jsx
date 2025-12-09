import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/Login/Login";
import Register from "../Components/Pages/Register/Register";
import Unauthorized from "../Components/Pages/Unauthorized/Unauthorized";
import ProtectedRoute from "./ProtectedRoutes";
import Header from "../Components/Ui/Header/Header";
import Footer from "../Components/Ui/Footer/Footer";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

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
            <Footer />
        </BrowserRouter>
    );
};

export default AppRoutes;
