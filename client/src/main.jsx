import { Fragment, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Fragment>
			<BrowserRouter>
				<App />
				<Toaster closeButton />
			</BrowserRouter>
		</Fragment>
	</StrictMode>
);
