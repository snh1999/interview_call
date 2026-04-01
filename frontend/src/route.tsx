import { Route, Routes } from "react-router";
import { Protected } from "./Protected";
import HomePage from "./pages/Homepage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="" element={<Protected />}>
				<Route path="/" element={<HomePage />} />
			</Route>
		</Routes>
	);
}
