import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import TraineeDashboard from "./pages/TraineeDashboard.jsx";
import TrainerDashboard from "./pages/TrainerDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

export default function App() {
  const [session, setSession] = useState(null); // { role, name }

  function handleLogin(role, name) {
    setSession({ role, name });
  }

  return (
    <div className="min-h-screen bg-mist font-body">
      <Navbar role={session?.role} onLogout={() => setSession(null)} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/trainee"
          element={
            session?.role === "trainee" ? (
              <TraineeDashboard name={session.name} />
            ) : (
              <Navigate to="/login?role=trainee" replace />
            )
          }
        />
        <Route
          path="/trainer"
          element={
            session?.role === "trainer" ? (
              <TrainerDashboard name={session.name} />
            ) : (
              <Navigate to="/login?role=trainer" replace />
            )
          }
        />
        <Route
          path="/admin"
          element={
            session?.role === "admin" ? (
              <AdminDashboard name={session.name} />
            ) : (
              <Navigate to="/login?role=admin" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}
