const HOST = import.meta.env.VITE_SERVER_URL;

const AUTH_ROUTE = "/api/auth";
const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`;
const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
const GET_USER = `${AUTH_ROUTE}/user-info`;
const SET_USER = `${AUTH_ROUTE}/update-profile`;
const SET_PROFILE_IMAGE = `${AUTH_ROUTE}/update-profile-image`;
const REMOVE_PROFILE_IMAGE = `${AUTH_ROUTE}/remove-profile-image`;

export {
	HOST,
	AUTH_ROUTE,
	SIGNUP_ROUTE,
	LOGIN_ROUTE,
	GET_USER,
	SET_USER,
	SET_PROFILE_IMAGE,
	REMOVE_PROFILE_IMAGE,
};
