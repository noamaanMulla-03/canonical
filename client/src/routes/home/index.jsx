import { useAppStore } from "../../store";

function Home() {
	const userInfo = useAppStore((state) => state.userInfo);
	return <div>{userInfo.email}</div>;
}

export default Home;
