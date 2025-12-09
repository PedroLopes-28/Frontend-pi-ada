import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token || token.trim() === "") {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("userName");
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
