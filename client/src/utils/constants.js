const HOST = import.meta.env.VITE_SERVER_URL;

const AUTH_ROUTE = "/api/auth";
const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`;
const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;

export { HOST, AUTH_ROUTE, SIGNUP_ROUTE, LOGIN_ROUTE };
