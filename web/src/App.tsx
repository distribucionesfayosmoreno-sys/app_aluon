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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Catalog />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/request" element={<WorkOrderRequest />} />
          <Route path="/requests" element={<RequestsInbox />} />
          <Route path="/status" element={<ClientStatus />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
