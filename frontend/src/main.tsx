import { MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@mantine/core/styles.css";
import { mantineCssVariableResolver } from "./cssVariableResolver.ts";
import AppRoutes from "./route.tsx";
import { theme } from "./theme.ts";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<MantineProvider
				theme={theme}
				cssVariablesResolver={mantineCssVariableResolver}
			>
				<AppRoutes />
			</MantineProvider>
		</BrowserRouter>
	</StrictMode>,
);
