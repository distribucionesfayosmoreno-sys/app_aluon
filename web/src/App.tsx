import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Catalog from "./pages/Catalog";
import Detail from "./pages/Detail";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Catalog />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
