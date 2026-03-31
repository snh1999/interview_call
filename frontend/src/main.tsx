import { MantineProvider } from "@mantine/core";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@mantine/core/styles.css";
import { mantineCssVariableResolver } from "./cssVariableResolver.ts";
import AppRoutes from "./route.tsx";
import { theme } from "./theme.ts";
import "./styles.css";

import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<StrictMode>
			<BrowserRouter>
				<MantineProvider
					theme={theme}
					cssVariablesResolver={mantineCssVariableResolver}
				>
					<Notifications />
					<AppRoutes />
				</MantineProvider>
			</BrowserRouter>
		</StrictMode>
	</Provider>,
);
