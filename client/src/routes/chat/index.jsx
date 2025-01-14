import { toast } from "sonner";
import { useAppStore } from "../../store/index";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Chat() {
	const navigate = useNavigate();
	const userInfo = useAppStore((state) => state.userInfo);

	useEffect(() => {
		if (!userInfo.profileSetup) {
			toast("Please complete your profile setup first!");
			navigate("/profile");
		}
	}, [userInfo, navigate]);

	return <div>Chat</div>;
}

export default Chat;
