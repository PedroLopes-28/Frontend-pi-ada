import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../Components/Pages/Login/Login";
import Register from "../Components/Pages/Register/Register";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => {
    return (
       <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            {/* <Route path="/jokes" element={
                <ProtectedRoute>
                Silvan, aqui dentro vc poe a pagina q vc criou e o path
                dela tem q ser /jokes igual ta ali
                <ProtectedRoute/>
            }/> */}
        </Routes>
       </BrowserRouter>
    );
};

export default AppRoutes;