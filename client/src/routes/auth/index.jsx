import { useState } from "react";
import Background from "@/assets/login2.png";
import Victory from "@/assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { SIGNUP_ROUTE } from "@/utils/constants";
import { LOGIN_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";

function Auth() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const navigate = useNavigate();
	const setUserInfo = useAppStore((state) => state.setUserInfo);

	const validateData = (email, password, confirmPassword) => {
		if (!email) {
			toast.error("Please enter your Email");
			return false;
		}

		if (!password) {
			toast.error("Please enter your Password");
			return false;
		}

		if (password.length < 8) {
			toast.error("Password must be at least 8 characters long");
			return false;
		}

		if (!confirmPassword) {
			toast.error("Please confirm your Password");
			return false;
		}

		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return false;
		}

		return true;
	};

	const handleLogin = async () => {
		const confirmPassword = password;

		if (validateData(email, password, confirmPassword)) {
			try {
				const response = await apiClient.post(
					LOGIN_ROUTE,
					{
						email,
						password,
					},
					{ withCredentials: true }
				);

				if (response.data.user.id) {
					setUserInfo(response.data.user);

					if (response.data.user.profileSetup) navigate("/chat");
					else navigate("/profile");
				}
			} catch (error) {
				if (error.response.status === 404)
					return toast.error("User not found");

				if (error.response.status === 400)
					return toast.error("Invalid credentials");

				return toast.error("Internal server error");
			}
		}
	};

	const handleSignup = async () => {
		if (validateData(email, password, confirmPassword)) {
			const response = await apiClient.post(
				SIGNUP_ROUTE,
				{
					email,
					password,
				},
				{ withCredentials: true }
			);
			// console.log({ response });
			if (response.status === 201) {
				setUserInfo(response.data.user);
				navigate("/profile");
			}
		}
	};

	return (
		<div className="h-[100vh] w-[100vw] flex items-center justify-center">
			<div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
				<div className="flex flex-col gap-10 items-center justify-center">
					<div className="flex items-center justify-center flex-col">
						<div className="flex items-center justify-center">
							<h1 className="font-serif text-5xl font-bold md:text-6xl">
								Canonical
							</h1>
							<img
								src={Victory}
								alt="Victory Emoji"
								className="h-[100px]"
							/>
						</div>
						<p className="font-medium text-center">
							Fill in the details to get started with the best
							chat app!
						</p>
					</div>
					<div className="flex items-center justify-center w-full">
						<Tabs defaultValue="login" className="w-3/4">
							<TabsList className="bg-transparent rounded-none w-full">
								<TabsTrigger
									value="login"
									className="data-[state=active]:bg-transparent text-black text-opacity-60 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-500"
								>
									Login
								</TabsTrigger>
								<TabsTrigger
									value="signup"
									className="data-[state=active]:bg-transparent text-black text-opacity-60 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-500"
								>
									Sign Up
								</TabsTrigger>
							</TabsList>
							<TabsContent
								className="flex flex-col gap-5 mt-10"
								value="login"
							>
								<Input
									placeholder="Email"
									autocomplete="off"
									type="email"
									className="rounded-full p-6"
									value={email}
									name="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Input
									placeholder="Password"
									type="password"
									className="rounded-full p-6"
									value={password}
									name="password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
								<Button
									onClick={handleLogin}
									className="rounded-full p-6"
								>
									Login
								</Button>
							</TabsContent>
							<TabsContent
								className="flex flex-col gap-5"
								value="signup"
							>
								<Input
									placeholder="Email"
									autocomplete="off"
									type="email"
									className="rounded-full p-6"
									value={email}
									name="email"
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Input
									placeholder="Password"
									type="password"
									className="rounded-full p-6"
									value={password}
									name="password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
								<Input
									placeholder="Confirm Password"
									type="password"
									className="rounded-full p-6"
									value={confirmPassword}
									name="confirmPassword"
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
								/>
								<Button
									onClick={handleSignup}
									className="rounded-full p-6"
								>
									Sign Up
								</Button>
							</TabsContent>
						</Tabs>
					</div>
				</div>
				<div className="hidden xl:flex justify-center items-center">
					<img
						src={Background}
						alt="Background"
						className="h-[700px]"
					/>
				</div>
			</div>
		</div>
	);
}

export default Auth;
