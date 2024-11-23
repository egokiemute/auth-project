// import FloatingShapes from "./components/FloatingShapes";
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Space from "./pages/Space";
import Spaces from "./pages/Spaces";
import MyReservations from "./pages/MyReservations";
import LoadingSpinner from "./components/LoadingSpinner";

import { Toaster } from "react-hot-toast";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import AppLayout from "./components/AppLayout";
import Search from "./pages/Search";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import TabDetail from "./components/TabDetail";
import Settings from "./pages/Settings";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import DesktopOnly from "./pages/DesktopOnly";
// import { Settings } from "lucide-react";

// protect routes that require authentication
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={user.role === "admin" ? "/admin-dashboard" : "/"} />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  // console.log(user);

  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/space" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    window.location.href = "/desktop-only";
    return null;
  }

  if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <AppLayout>
      <div className="min-h-screen bg-[#FAFAFA] relative overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/desktop-only" element={<DesktopOnly />} />
          <Route path="/search" element={<Search />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/reservations" element={<MyReservations />} />
          <Route path="/tab/:id" element={<TabDetail />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/space"
            element={
              <ProtectedRoute>
                <Space />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reserve"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <RedirectAuthenticatedUser>
                <RegisterPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />

          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          {/* catch all routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </AppLayout>
  );
}

export default App;
