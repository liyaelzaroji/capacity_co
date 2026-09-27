import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import TraineeDashboard from "./pages/TraineeDashboard.jsx";
import TrainerDashboard from "./pages/TrainerDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { pendingApplications as seedApplications } from "./data/mockData.js";

export default function App() {
  const [session, setSession] = useState(null); // { role, name }

  // Trainer signup applications, shared between the signup wizard and the
  // admin queue so a demo can go: sign up as trainer -> take skill test ->
  // sign in as admin -> approve that exact application.
  const [applications, setApplications] = useState(seedApplications);

  function handleLogin(role, name) {
    setSession({ role, name });
  }

  function handleApply(application) {
    setApplications((apps) => [application, ...apps]);
  }

  function handleDecision(id, decision) {
    setApplications((apps) => apps.map((a) => (a.id === id ? { ...a, status: decision } : a)));
  }

  return (
    <div className="min-h-screen bg-mist font-body">
      <Navbar role={session?.role} onLogout={() => setSession(null)} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={handleLogin} onApply={handleApply} />} />
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
              <AdminDashboard
                name={session.name}
                applications={applications}
                onDecision={handleDecision}
              />
            ) : (
              <Navigate to="/login?role=admin" replace />
            )
          }
        />
      </Routes>
    </div>
  );
}
