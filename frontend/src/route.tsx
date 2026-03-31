import { Route, Routes } from "react-router";
import App from "./App";
import { LoginPage } from "./auth/LoginPage";
import { RegisterPage } from "./auth/RegisterPage";
import { Protected } from "./Protected";

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="" element={<Protected />}>
				<Route path="/" element={<App />} />
			</Route>
		</Routes>
	);
}
