import { Route, Routes } from "react-router";
import { Protected } from "./Protected";
import CreateProblemPage from "./pages/CreateProblemPage";
import DashboardPage from "./pages/Dashboard";
import HomePage from "./pages/Homepage";
import { LoginPage } from "./pages/LoginPage";
import ProblemPage from "./pages/ProblemPage";
import ProblemsPage from "./pages/ProblemsPage";
import { RegisterPage } from "./pages/RegisterPage";
import SessionPage from "./pages/SessionsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="" element={<Protected />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problems/create" element={<CreateProblemPage />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
        <Route path="/session/:id" element={<SessionPage />} />
      </Route>
    </Routes>
  );
}
