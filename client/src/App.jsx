import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./routes/auth";
import Chat from "./routes/chat";
import Home from "./routes/home";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/auth" element={<Auth />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/profile" element={<Home />} />
				<Route path="/" element={<Home />} />
				<Route path="*" element={<Navigate to="/auth" />}></Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
