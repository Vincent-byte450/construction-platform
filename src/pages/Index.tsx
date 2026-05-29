import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const Index = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  // Authenticated users → dashboard; guests → public landing page
  return <Navigate to={isAuthenticated ? "/dashboard" : "/landing"} replace />;
};

export default Index;
