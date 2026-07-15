import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface RoleRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function RoleRoute({
  allowedRoles,
  children,
}: RoleRouteProps) {
  const { role } = useAuth();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}