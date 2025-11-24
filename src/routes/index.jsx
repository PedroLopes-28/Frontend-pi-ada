import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Components/Pages/Login/Login";
import Register from "../Components/Pages/Register/Register";

const AppRoutes = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/register" element={<Register />} />
        </Routes>
        </BrowserRouter> 
    );
};

export default AppRoutes;