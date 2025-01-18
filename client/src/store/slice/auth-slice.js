const nullUser = {
	id: "",
	username: "",
	email: "",
	firstName: "",
	lastName: "",
	image: "",
	colorCode: 0,
};

const createAuthSlice = (set) => ({
	userInfo: nullUser,
	setUserInfo: (userInfo) => set({ userInfo }),
});

export { createAuthSlice, nullUser };
