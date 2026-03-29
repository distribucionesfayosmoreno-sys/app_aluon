import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Catalog from "./pages/Catalog";
import Detail from "./pages/Detail";
import Checkout from "./pages/Checkout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import WorkOrderRequest from "./pages/WorkOrderRequest";
import RequestsInbox from "./pages/RequestsInbox";
import ClientStatus from "./pages/ClientStatus";
import ProtectedRoute from "./components/ProtectedRoute";
import { isAuthenticated } from "./utils/auth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected app */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Catalog />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/request" element={<WorkOrderRequest />} />
          <Route path="/requests" element={<RequestsInbox />} />
          <Route path="/status" element={<ClientStatus />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to={isAuthenticated() ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
