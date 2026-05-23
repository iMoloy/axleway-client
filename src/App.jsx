import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddCar from "./pages/AddCar";
import MyAddedCars from "./pages/MyAddedCars";
import MyBookings from "./pages/MyBookings";
import MyProfile from "./pages/MyProfile";
import NotFound from "./pages/NotFound";

export function App() {
  return (
    <BrowserRouter>
      <div className="page-shell">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route path="/my-added-cars" element={<MyAddedCars />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
