import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Catalog from "./pages/Catalog";
import Detail from "./pages/Detail";
import Checkout from "./pages/Checkout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WorkOrderRequest from "./pages/WorkOrderRequest";
import RequestsInbox from "./pages/RequestsInbox";
import ClientStatus from "./pages/ClientStatus";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Catalog />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail" element={<Detail />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/request"
            element={
              <ProtectedRoute>
                <WorkOrderRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <RequestsInbox />
              </ProtectedRoute>
            }
          />
          <Route
            path="/status"
            element={
              <ProtectedRoute>
                <ClientStatus />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
