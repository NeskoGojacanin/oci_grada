import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Objave from "./pages/Objave";
import NovaObjava from "./pages/NovaObjava";
import DetaljiObjave from "./pages/DetaljiObjave";
import MojePrijave from "./pages/MojePrijave";
import AdminPanel from "./pages/AdminPanel";
import KoordinatorPanel from "./pages/KoordinatorPanel";
import AdminLogin from "./pages/AdminLogin";



function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/objave" element={<Objave />} />
          <Route path="/objave/:id" element={<DetaljiObjave />} />
          <Route path="/nova-objava" element={<NovaObjava />} />
          <Route path="/moje-prijave" element={<MojePrijave />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/koordinator" element={<KoordinatorPanel />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;