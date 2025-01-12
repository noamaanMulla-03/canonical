import { create } from "zustand";
import { createAuthSlice } from "./slice/auth-slice";

const useAppStore = create((...a) => ({
	...createAuthSlice(...a),
}));

export { useAppStore };
