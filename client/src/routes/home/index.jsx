import { useState, useRef } from "react";
import { useAppStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { colors } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { HOST, SET_USER } from "@/utils/constants";
import { apiClient } from "@/lib/api-client";
import { SET_PROFILE_IMAGE, REMOVE_PROFILE_IMAGE } from "@/utils/constants";

function Home() {
	const userInfo = useAppStore((state) => state.userInfo);
	const setUserInfo = useAppStore((state) => state.setUserInfo);
	const navigate = useNavigate();
	const [firstName, setFirstName] = useState(userInfo.firstName);
	const [lastName, setLastName] = useState(userInfo.lastName);
	const [image, setImage] = useState(userInfo.image);
	const [hovered, setHovered] = useState(false);
	const [selectedColor, setSelectedColor] = useState(userInfo.colorCode || 0);
	const fileInputRef = useRef(null);

	const validate = () => {
		const validationStatus = !firstName
			? "First Name is required"
			: !lastName
			? "Last Name is required"
			: false;

		if (validationStatus) toast.error(validationStatus);

		return !validationStatus;
	};

	const saveChanges = async () => {
		if (!validate()) return;

		try {
			const response = await apiClient.post(
				SET_USER,
				{
					firstName,
					lastName,
					colorCode: selectedColor,
				},
				{ withCredentials: true }
			);

			if (response.status === 200 && response.data) {
				console.log(response.data);
				setUserInfo({ ...response.data });
				toast.success("Profile updated successfully");
				navigate("/chat");
			}
		} catch (error) {
			console.log(`[-] Error in saveChanges: ${error.message}`);
			toast.error("Internal server error");
		}
	};

	const handleNavigate = () => {
		userInfo.profileSetup
			? navigate("/chat")
			: toast.error("Please complete your profile setup!");
	};

	const handleFileInputClick = () => {
		const { current } = fileInputRef;
		current.click();
	};

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("profile-image", file);

		setImage(URL.createObjectURL(file));
		const response = await apiClient.post(SET_PROFILE_IMAGE, formData, {
			withCredentials: true,
		});

		if (response.status === 200 && response.data) {
			const newImageURL = `${HOST}/${response.data.image}`;

			setUserInfo({
				...userInfo,
				image: image ? newImageURL : userInfo.image,
			});

			toast.success("Profile Image updated successfully!");
		}
	};

	const handleDeleteImage = async () => {
		try {
			const response = await apiClient.delete(REMOVE_PROFILE_IMAGE, {
				withCredentials: true,
			});

			if (response.status === 200 && response.data) {
				setUserInfo({
					...userInfo,
					image: undefined,
				});

				setImage(undefined);
				toast.success("Profile Image removed successfully!");
			}
		} catch (error) {
			console.log(`[-] Error in handleDeleteImage: ${error.message}`);
			toast.error("Internal server error");
		}
	};

	return (
		<div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
			<div className="flex flex-col gap-10 w-[80vw] md:w-max">
				<div onClick={handleNavigate}>
					<IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
				</div>
				<div className="grid grid-cols-2">
					<div
						className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
						onMouseEnter={() => setHovered(true)}
						onMouseLeave={() => setHovered(false)}
					>
						<Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
							{image ? (
								<AvatarImage
									src={image}
									alt="profile"
									className="object-cover w-full h-full bg-black"
								/>
							) : (
								<div
									className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
										selectedColor
									)}`}
								>
									{firstName
										? firstName.split("").shift()
										: userInfo.email.split("").shift()}
								</div>
							)}
						</Avatar>
						{hovered && (
							<div
								className="absolute inset-0 flex items-center justify-center bg-black/50 ring-fuchsia-50 cursor-pointer rounded-full"
								onClick={
									image
										? handleDeleteImage
										: handleFileInputClick
								}
							>
								{image ? (
									<FaTrash className="text-white text-3xl cursor-pointer" />
								) : (
									<FaPlus className="text-white text-3xl cursor-pointer" />
								)}
							</div>
						)}
						<input
							type="file"
							ref={fileInputRef}
							className="hidden"
							name="profile-image"
							onChange={handleImageChange}
							accept=".jpg,.jpeg,.png,.webp"
						/>
					</div>
					<div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
						<div className="w-full">
							<Input
								className="rounded-lg p-6 bg-[#2c2e3b] border-none"
								placeholder="Email"
								type="email"
								disabled={true}
								value={userInfo.email}
								name="EMAIL"
								autoComplete="off"
							/>
						</div>
						<div className="w-full">
							<Input
								className="rounded-lg p-6 bg-[#2c2e3b] border-none"
								placeholder="First Name"
								type="text"
								value={firstName || ""}
								name="FIRST_NAME"
								autoComplete="off"
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
						<div className="w-full">
							<Input
								className="rounded-lg p-6 bg-[#2c2e3b] border-none"
								placeholder="Last Name"
								type="text"
								value={lastName || ""}
								name="LAST_NAME"
								autoComplete="off"
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
						<div className="w-full flex gap-5">
							{colors.map((color, index) => (
								<div
									key={index}
									className={`${color} ${
										selectedColor === index
											? "outline outline-white/75 outline-2 border-none"
											: ""
									} h-8 w-8 rounded-full cursor-pointer transition-all duration-300`}
									onClick={() => setSelectedColor(index)}
								></div>
							))}
						</div>
					</div>
				</div>
				<div className="w-full">
					<Button
						className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
						onClick={saveChanges}
					>
						Save Changes
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Home;
