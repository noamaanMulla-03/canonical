import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "@/routes/auth";
import Chat from "@/routes/chat";
import Home from "@/routes/home";
import { useAppStore } from "@/store/index";
import { apiClient } from "@/lib/api-client";
import { GET_USER } from "@/utils/constants";
import { HOST } from "@/utils/constants";

const PrivateRoutes = ({ children }) => {
	const userInfo = useAppStore((state) => state.userInfo);
	const authCheck = userInfo ? children : <Navigate to="/auth" />;
	return authCheck;
};

const AuthRoute = ({ children }) => {
	const userInfo = useAppStore((state) => state.userInfo);
	const authCheck = userInfo ? <Navigate to="/chat" /> : children;
	return authCheck;
};

const getUser = async (setUserInfo, setLoading) => {
	try {
		const response = await apiClient(GET_USER, {
			withCredentials: true,
		});

		if (response.status === 200 && response.data.id) {
			const userData = response.data;

			setUserInfo({
				...userData,
				image: userData.image
					? `${HOST}/${userData.image}`
					: userData.image,
			});
		} else setUserInfo(undefined);
	} catch (error) {
		console.log("[-] Error in App.jsx: ", error.message);
		setUserInfo(undefined);
	} finally {
		setLoading(false);
	}
};

function App() {
	const { userInfo, setUserInfo } = useAppStore();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		try {
			if (userInfo === undefined) getUser(setUserInfo, setLoading);
			else setLoading(false);
			console.log(userInfo);
		} catch (error) {
			console.log("[-] Error in App.jsx: ", error.message);
		}
	}, [setUserInfo, userInfo]);

	if (loading) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<Routes>
			<Route
				path="/auth"
				element={
					<AuthRoute>
						<Auth />
					</AuthRoute>
				}
			/>
			<Route
				path="/chat"
				element={
					<PrivateRoutes>
						<Chat />
					</PrivateRoutes>
				}
			/>
			<Route
				path="/profile"
				element={
					<PrivateRoutes>
						<Home />
					</PrivateRoutes>
				}
			/>
			<Route
				path="/"
				element={
					<PrivateRoutes>
						<Home />
					</PrivateRoutes>
				}
			/>
			<Route path="*" element={<Navigate to="/auth" />}></Route>
		</Routes>
	);
}

export default App;
