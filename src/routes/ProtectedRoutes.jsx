import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // Verifica se o token existe e não está vazio
  if (!token || token.trim() === "") {
    // Limpa qualquer dado inválido
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("userName");
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
