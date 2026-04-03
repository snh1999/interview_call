import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "./store/store";

export function Protected() {
  const { user } = useAppSelector((state) => state.auth);
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
