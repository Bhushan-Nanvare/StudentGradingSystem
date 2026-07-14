import AppRoutes from "./Routes/AppRoutes";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster
        richColors
        position="top-right"
      />
    </AuthProvider>
  );
}

export default App;