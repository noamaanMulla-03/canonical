import { Fragment } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
	//   <StrictMode>
	<Fragment>
		<App />
		<Toaster closeButton />
	</Fragment>
	//   </StrictMode>,
);
